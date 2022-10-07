const express = require("express");
const Profile = require("../models/UserProfile");
exports.createProfile = async(req,res)=>{
    try {
        const{location,interests,gender,bio} = req.body;

        //build an object
        const Obj = {};
        Obj.location = location;    
        if(interests){
            Obj.interests = interests.split(",").map(ele => ele.trim());
        }
        Obj.gender = gender;
        Obj.bio = bio;
        Obj.user = req.user.id;

        //create a new profile
        const profile = new Profile(Obj);
        profile.save();
        res.json({message : "Profile Created" , profile})
    } catch (error) {
        console.log('Server Error : ',error.message);
        res.send('Server Error')
    }
}