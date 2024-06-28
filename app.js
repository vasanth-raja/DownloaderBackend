const express=require('express')
const app=express();
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config();
const downloadRoutes=require('./api/download')
const youtubedownload=require('./api/youtubedownload')
const facebookdownload=require('./api/facedownload')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/download',downloadRoutes)
app.use('/youtubedownload',youtubedownload)
app.use('/facebookdownload',facebookdownload)
app.use('/',(req,res,next)=>{
    console.log("Error")
    res.status(200).json({
        message:"unhandled route"
    })
})

module.exports =app