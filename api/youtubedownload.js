const express= require('express')
const router=express.Router()
const axios=require('axios')
const ytdl=require('ytdl-core')
const { Innertube, UniversalCache, Utils } = require('youtubei.js');
const { existsSync, mkdirSync} = require('fs');
router.get('/',(req,res,next)=>{
    console.log("GET")
    res.status(200).json({
        message: 'Get request recieved'
    })
})
router.post('/',async(req,res,next)=>{

    async function ytVideoDownload() {
        try {
            const info = await ytdl.getInfo(req.body.url);
            console.log(info)
            if (info.formats) {
                // const downloadLink = response.data.link; // Adjust based on actual API response structure.
            //    const data=info.formats;
            const data = ytdl.filterFormats(info.formats, format => format.hasVideo && format.container=="mp4")
            const details=info.videoDetails;
            //    console.log(data.map((format)=>format.url))
            res.status(200).json({ message: 'Download links',data: data,details: details });
            } else {
                console.log("error")
                res.status(400).json({ message: 'Failed to get download link' });
            }
            // res.json({ downloadLink });
        } catch (error) {
            console.error('Error fetching download link:', error);
            res.status(400).json({ message: 'Failed to get download link' });
        }
    }
    const downloadLink = await ytVideoDownload();
})
router.get('/download',async(req,res,next)=>{
        try {
            const url = req.query.link;
              const videoId = await ytdl.getURLVideoID(url);
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