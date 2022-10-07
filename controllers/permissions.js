const express = require("express");
const Profile = require("../models/UserProfile");
const User = require("../models/UserSchema");
exports.photoSharing = async(req,res)=>{
    try {
        //first search whether logged in user id is present in receiving users array
        const targetUser = await Profile.findOne({user : req.params.user_id});
        //find the targetUser received array
        let count = 0;
        targetUser.received.forEach(ele=>{
            if(ele.user.toString() === req.user.id)
            {
                //send a request to the targetUser
                count+=1;
                targetUser.permissions.unshift({user : req.user.id,Type:"photosharing"});
            }
        })
        if(count<1){return res.send('You can not send permissions')}
        await targetUser.save();
        //find the user
        const user = await User.findOne({_id:req.params.user_id});
        
        res.send(`Permission sent to : ${user.name}`)
    } catch (error) {

        console.log('Server Error : ',error.message);
        res.send('Server Error');
    }   
}

//accept or decline the permission
exports.acceptOrDecline = async(req,res)=>{
    try {
        //find the permission by it's id
        const profile = await Profile.findOne({user : req.user.id});
       //const sender = await User.findOne({_id : req.params.})
        var mySender='';
        let reply = false;
        profile.permissions.forEach(ele=>{
            if(ele._id.toString() === req.params.permission_id)
            {
                ele.access = true;  
                reply=true;
                mySender = ele.user.toString();
            }
            
        });
        await profile.save();
        const senderId = mySender;
        const senderDetails = await User.findOne({_id : senderId}); 
        const user = await Profile.findOne({user : senderId});
        user.permissions.unshift({user : profile.user, Type:"photo Sharing",access:reply});
        await user.save();
        return res.send(`you accepted photo sharing request by : ${senderDetails.name}`)
        
    } catch (error) {
        console.log('Server Error => ',error);
        res.send('Server Error');
    }
}