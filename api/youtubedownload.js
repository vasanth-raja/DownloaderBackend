const express= require('express')
const router=express.Router()
const axios=require('axios')
const ytdl=require('ytdl-core')
router.get('/',(req,res,next)=>{
    console.log("GET")
    res.status(200).json({
        message: 'Get request recieved '
    })
})
router.post('/',async(req,res,next)=>{

    async function ytVideoDownload() {
        try {
            const info = await ytdl.getInfo(req.body.url);
            
             console.log("info..........", info);
            if (info.formats) {
                // const downloadLink = response.data.link; // Adjust based on actual API response structure.
            //    const data=info.formats;
            const data = ytdl.filterFormats(info.formats, format => format.hasVideo && format.hasAudio)
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
    console.log(downloadLink)
    
})
router.post('/download',async(req,res,next)=>{
        try {
            const videoUrl = req.body.url;
            const quality=req.body.quality;
            
            if (!videoUrl) {
                return res.status(400).send('No URL provided');
              }
            
              res.header('Content-Disposition', 'attachment; filename="video.mp4"');
              ytdl(videoUrl, { filter: format => format.container === 'mp4' && format.hasAudio && format.hasVideo && format.qualityLabel==quality})
                .pipe(res)
                .on('finish', () => {
                  console.log('Video downloaded and sent to client successfully!');
                })
                .on('error', (err) => {
                  console.error('Error downloading video:', err);
                  res.status(500).send('Error downloading video');
                });
            
            // res.json({ downloadLink });
        } catch (error) {
            console.error('Error fetching download link:', error);
            res.status(400).json({ message: 'Failed to get download link' });
        }
    }
    

    
)
module.exports=router