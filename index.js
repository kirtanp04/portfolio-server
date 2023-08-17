const express = require('express');
const cors = require('cors');
const app = express();
const nodemailer = require("nodemailer")
require("dotenv").config()
app.use(cors());
app.use(express.json({limit:"50mb"}))


const PORT = process.env.PORT || 7000

app.post('/contact',async(req,res)=>{
    const{values} = req.body
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        });
        const mailOptions = {
            from: process.env.USER,
            to: process.env.USER,
            subject: values.subject,
            html:`<h2>Name:${values.name}</h2><br></br>
            <h2>Email:${values.email}</h2><br></br>
            <h2>Subject:${values.subject}</h2><br></br>
            <h2>Message:${values.message}</h2><br></br>`
        }
        transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                console.log(err).status(404).send({ mess: "error to send code" })
            } else {
                
                res.status(200).send({ mess: "sent" })
            
            }
        })
    }catch{
        res.status(404).send({mess:"server error"})
        console.log("error")
    }
})    

  

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})