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
    const url = req.body.url;
    const match = url.match(/\/(reels?|p)\/([^\/]+)/);

   
    console.log("parts",match)
const options = {
  method: 'GET',
  url: 'https://instagram-scraper-api2.p.rapidapi.com/v1/post_info',
  params: {
    code_or_id_or_url: match[1],
    include_insights: 'true'
  },
      headers: {
        'x-rapidapi-key': process.env.API_KEY,
        'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log("response.data",response.data);
        res.status(200).json({ message: 'Download links',data: response.data});
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
})
module.exports=router