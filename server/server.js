require("dotenv").config();

const express = require("express");
const app = express();

//app.listen(5000);

const aws = require("aws-sdk");
const multer = require("multer");
const multer_S3 = require("multer-s3");

aws.config.update({
    secretAccessKey: process.env.ACCESS_SECRET,
    accessKeyId: process.env.ACCESS_KEY,
    region: process.env.REGION
})

const BUCKET = process.env.BUCKET
const s3 = new aws.S3();

const upload = multer({
    storage:multer_S3({
        bucket:BUCKET,
        s3:s3,
        acl: "public-read",
        key: (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
        }
    })
})

app.post("/upload",upload.single("file"), (req,res) =>{
    console.log(req.file);
    res.send('successfully uploaded' + req.file.location + 'location');

} )

app.get("/list", async(req,res)=>{
    let r = await s3.listObjectsV2({Bucket:BUCKET}).promise()
    let x = r.Contents.map(item => item.Key);
    res.send(x);
})

app.get("/download/:filename", async(req,res)=>{
    const filename = req.params.filename
    let x = await s3.getObject({Bucket:BUCKET, Key:filename}).promise()
    res.send(x.Body);
})

app.delete("/delete/:filename", async(req,res)=>{
    const filename = req.params.filename
    await s3.deleteObject({Bucket:BUCKET, Key:filename}).promise()
    res.send("file deleted successfully");
})

////////////////////google login auto //////////////////

// const dotenv = require('dotenv');
// const path = require('path');
// const { OAuth2Client } = require('google-auth-library');
// const cors = require("cors")

// app.use(cors())

// dotenv.config();
// const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

// const users = [];

// function upsert(array, item) {
//   const i = array.findIndex((_item) => _item.email === item.email);
//   if (i > -1) array[i] = item;
//   else array.push(item);
// }

// app.post('/api/google-login', async (req, res) => {
//   const { token } = req.body;
//   const ticket = await client.verifyIdToken({
//     idToken: token,
//     audience: process.env.CLIENT_ID,
//   });
//   const { name, email, picture } = ticket.getPayload();
//   upsert(users, { name, email, picture });
//   res.status(201);
//   res.json({ name, email, picture });
// });

// app.use(express.static(path.join(__dirname, '/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/build/index.html'))
// );

app.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server is ready at http://localhost:${process.env.PORT || 5000}`
  );
});