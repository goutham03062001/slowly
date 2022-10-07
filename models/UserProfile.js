const mongoose = require("mongoose");
const UserProfile = new mongoose.Schema({
    user : {type:mongoose.Types.ObjectId,required:true},
    location:{type:String,required:true},
    interests:{type : [String], required:true},
    gender:{type:String,required:true},
    bio:{type:String,required:true},

    sent:[
        {
            user : {type:mongoose.Types.ObjectId},
            letter:{type:String}
        }
    ],
    received:[
        {
            user : {type:mongoose.Types.ObjectId},
            letter:{type:String}
        }
    ],
    drafts:[
        {
            user : {type:mongoose.Types.ObjectId},
            msg :  {type:String}
        }
    ],

    permissions:[
        {
            user:{type:mongoose.Types.ObjectId},
            Type:{type:String},
            access:{type:Boolean, default:false}
        }
    ]

});

module.exports = Profile = mongoose.model("profile",UserProfile);