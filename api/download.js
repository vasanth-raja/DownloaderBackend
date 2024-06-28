const express= require('express')
const router=express.Router()
const axios=require('axios')
router.get('/',(req,res,next)=>{
    console.log("GET")
    res.status(200).json({
        message: 'Get request recieved '
    })
})
router.post('/',(req,res,next)=>{
    console.log(req.body.url)
    axios.post(process.env.LINKEDINURL,{
        'url':req.body.url
    },
        {
        headers:{
            'Content-Type':'application/json'
        }}
        
    ).then(value=>{
        console.log(value.data.src)
        res.status(200).json({
            url:value.data.src
        })
    }).catch(err=>{
        console.log(err)
        res.status(404).json({
            message: 'failed to fetch video'
        })
    })
})
module.exports=router

