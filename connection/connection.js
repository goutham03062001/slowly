const mongoose = require("mongoose");
mongoose.connect(process.env.db).then((success)=>{console.log('Connected to Db')})
.catch((err)=>{console.log('Error Occurred : ',err.message)})