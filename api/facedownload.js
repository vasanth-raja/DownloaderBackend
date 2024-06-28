const express= require('express')
const router=express.Router()
const axios=require('axios')
router.get('/',(req,res,next)=>{
    console.log("GET")
    res.status(200).json({
        message: 'Get request recieved '
    })
})
router.post('/',async (req,res,next)=>{
    console.log(req.body.url)
    const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php',
  params: {
    url: req.body.url
  },
  headers: {
    'x-rapidapi-key': process.env.API_KEY,
    'x-rapidapi-host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
  }
};

try {
    const response = await axios.request(options)
    res.status(200).json({ message: 'Download links',data: response.data});
    console.log(response.data);
} catch (error) {
    console.error(error);
}
})
module.exports=router