const express= require('express')
const router=express.Router()
const nodemailer=require('nodemailer')
router.get('/',(req,res,next)=>{
    console.log("GET")
    res.status(200).json({
        message: 'Get request recieved at contact us'
    })
})

router.post('/',(req,res,next)=>{
    console.log("mail req triggered")
    const email=req.body.email
    const name=req.body.firstName+req.body.lastName
    const issue=req.body.issue
    const furtherDetails=req.body.furtherDetails

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.PASS_KEY,
        },
      });
      var mailOptions = {
        from: 'SocialBox "<autoworksproj@gmail.com>"',
        to: process.env.EMAIL_BOX,
        subject: "Contact Us",
        text: `Username:${name}
EmailId:${email}
issue:${issue}
Deitals:${furtherDetails}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(".....................................", error);
          return res.status(500).json({

            message: "Mail not sent",
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            message: "Mail Sent",
          });
        }
      });

})
module.exports=router