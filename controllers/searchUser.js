const express = require("express");
const Profile = require("../models/UserProfile");
const User = require("../models/UserSchema")
exports.searchUser = async(req,res)=>{

    try {
        
        
             
         var result = [];
         const profile = await Profile.find();
         
         let obj = {};
         profile.forEach(ele=>{
            if(ele.location == req.params.location_name)
            {
                
                obj.location = ele.location;
                obj.gender = ele.gender;
                obj.interests = ele.interests;
                obj.bio = ele.bio;
                obj.user = ele.user;
                
                result.push(obj);
            }
         })

         
         res.json({message : "your search results", result});
    } catch (error) {
        console.log('Server Error', error.message);
        res.send('Server Error')
    }
}