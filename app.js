const express=require('express')
const app=express();
const cors=require('cors')
const morgan=require('morgan')
const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config();
const downloadRoutes=require('./api/download')
const youtubedownload=require('./api/youtubedownload')
const facebookdownload=require('./api/facedownload')
const instagramdownload=require('./api/instagramdownload')
const userRoutes=require("./api/routes/user")

mongoose.connect('mongodb://vasanthrajark:'+process.env.MONGO_ATLAS_PW+'@ac-rln0kig-shard-00-00.thvry6q.mongodb.net:27017,ac-rln0kig-shard-00-01.thvry6q.mongodb.net:27017,ac-rln0kig-shard-00-02.thvry6q.mongodb.net:27017/videodownloader?ssl=true&replicaSet=atlas-ym9lka-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log("connection made")
}).catch(error => console.error(error));;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/download',downloadRoutes)
app.use('/youtubedownload',youtubedownload)
app.use('/facebookdownload',facebookdownload)
app.use('/instagramdownload',instagramdownload)
app.use('/user',userRoutes)
app.use('/',(req,res,next)=>{
    console.log("Error")
    res.status(200).json({
        message:"unhandled route"
    })
});

const port=process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

module.exports =app