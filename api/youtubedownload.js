const express= require('express')
const router=express.Router()
const axios=require('axios')
const { Innertube, UniversalCache, Utils } = require('youtubei.js');

router.get('/',(req,res,next)=>{
    console.log("GET")
    res.status(200).json({
        message: 'Get request recieved'
    })
})
function extractVideoId(url) {
      const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.*\/)?([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] || match[2] : null;
    }
router.post('/',async(req,res,next)=>{
    try {
        const url = req.body.url;
          const videoId =extractVideoId(url);
        if (!url) {
            return res.status(400).send('No URL provided');
          }
        
          
         
          console.log(videoId);
          itags=[299,298,135,134,133,160]
          audioItag=[140]
          const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });
          const metaInfo = await yt.getBasicInfo(videoId);
          const videoDetails=metaInfo.basic_info
          const videoFormats=metaInfo.streaming_data.adaptive_formats.filter((item) =>itags.includes(item.itag) )
          console.log(metaInfo)
          console.log("Video Formats",videoFormats);
          res.status(200).json({videoDetails:videoDetails,videoFormats:videoFormats})
        } catch (error) {
            console.log(".....finish......");
            console.error('Error fetching download link:', error);
            res.status(400).json({ message: 'Failed to get download link' });
        }
    
})
router.get('/download',async(req,res,next)=>{
        try {
            const url = req.query.link;
              const videoId =extractVideoId(url);
            if (!url) {
                return res.status(400).send('No URL provided');
              }
            
              
             
              console.log(videoId);
              itags=[299,298,135,134,133,160]
              audioItag=[140]
              const yt = await Innertube.create({ cache: new UniversalCache(false), generate_session_locally: true });
              const metaInfo = await yt.getBasicInfo(videoId);
              console.log(metaInfo.streaming_data.adaptive_formats.filter((item) =>item.has_audio ));
              // itags.includes(item.itag)
              const stream = await yt.download(videoId, {
                  type: 'video+audio', // audio, video or video+audio
                  quality: 'best', // best, bestefficiency, 144p, 240p, 480p, 720p and so on.
                  format: 'mp4' // media container format 
              });
      
              console.log("stream",stream);
      
              res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
              res.setHeader('Content-Type', 'video/mp4');
      
              // const file = createWriteStream(`${dir}/downloaded_video.mp4`);
      
              for await (const chunk of Utils.streamToIterable(stream)) {
                  // file.write(chunk);
                  res.write(chunk);

              }
              
              res.end();
            
            // res.json({ downloadLink });
        } catch (error) {
            console.log(".....finish......");
            console.error('Error fetching download link:', error);
            res.status(400).json({ message: 'Failed to get download link' });
        }
    }
    

    
)
module.exports=router