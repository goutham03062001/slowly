const express = require("express");
const router = express.Router();
// const cloudinary = require("cloudinary").v2;
// cloudinary.config({
//     cloud_name: 'df7u8xpms', 
//     api_key: '868267597539716', 
//     api_secret: 'wufwQ3UrymTlQKMGsl-Vsx6tVjw',
//     secure: true
// })

router.get("/", (req,res)=>{res.send('hello')} )
module.exports = router;