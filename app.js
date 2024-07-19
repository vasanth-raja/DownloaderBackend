const express=require('express')
const app=express();
const cors=require('cors')


const dotenv=require('dotenv')
app.use(cors())
dotenv.config();
const downloadRoutes=require('./api/download')
const youtubedownload=require('./api/youtubedownload')
const facebookdownload=require('./api/facedownload')
const instagramdownload=require('./api/instagramdownload')
const contactus=require("./api/contact")



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/download',downloadRoutes)
app.use('/youtubedownload',youtubedownload)
app.use('/facebookdownload',facebookdownload)
app.use('/instagramdownload',instagramdownload)
app.use('/contactus',contactus)
app.use('/',(req,res,next)=>{
    console.log("unhandled route")
    res.status(200).json({
        message:"unhandled route"
    })
});

const port=process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

module.exports =app