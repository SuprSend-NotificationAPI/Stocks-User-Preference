require("dotenv").config()
const connectToMongo =require("./db");
connectToMongo();
const express = require("express")
var fetchuser = require("./middleware/fetchUser")
const app  = express();
const port = 4000;
const User = require("./models/user")
var jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET
const cors = require('cors');
const {Suprsend} = require("@suprsend/node-sdk");
const supr_client = new Suprsend(process.env.WKEY, process.env.WSECRET);
const crypto = require('crypto')



//middleware if we want to read the json and req file
app.use(cors());
app.use(express.json());


/*******************************add to database and register on suprsend************************/

app.post("/register",async(req,res)=>{
    let success = false;
    const user = await User.create({
        email : req.body.email,
        name : req.body.name,
        phone : req.body.countryCode+req.body.phone,
        password : req.body.password
    })
    const data = {
        user : {
            id : user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    success = true;
    const distinct_id = user.email;
    const user1 = supr_client.user.get_instance(distinct_id);
    user1.add_email(user.email) 
    user1.add_sms("+"+user.phone) 
    user1.add_whatsapp("+"+user.phone)
    const response = await user1.save()
    response.then((res) => console.log("response", res));
    res.json({success,authtoken});
})


/*****************************login user *******************************************************/

app.post("/login",async(req,res)=>{
   const {email,password} = req.body;
   let success = false;
   let user = await User.findOne({email : email});
   if(!user){
    return res.status(400).json({success,message : "user doesnot exists"})
   }
   if(password!=user.password)return res.status(400).json({success,message:"password is wrong"})
   const data = {
     user : {
        id : user.id
     }
   }
   const authtoken = jwt.sign(data,JWT_SECRET);
   success = true;
   res.json({success,authtoken});
})


/**************************logged in user details****************************/

function hmac_rawurlsafe_base64_string(distinct_id, secret) {
 const hash = crypto
     .createHmac("sha256", secret)
     .update(distinct_id)
     .digest("base64url");
     return hash.trimEnd("=");
   }

app.post("/getuser",fetchuser,async(req,res)=>{
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    const secret = process.env.USERSECRET;
    const distinct_id = user.email;
    res.json({email : user.email,key : hmac_rawurlsafe_base64_string(distinct_id,secret)});
})

/**********************listening on port **************************************/


app.listen(port,()=>{
    console.log("server started on port 4000");
})

