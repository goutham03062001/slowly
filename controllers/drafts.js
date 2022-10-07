const express = require("express");
const { update } = require("../models/UserProfile");
const Profile = require("../models/UserProfile");
const axios = require("axios");
exports.saveDraft = async(req,res)=>{
    
    try {
        /*
        first get the current logged in id
        then send the current letter into drafts array

    */

    const presentUserId = req.user.id;
    const currUser = await Profile.findOne({user : presentUserId});
    const targetUserId = req.params.target_user_id;
    //grab the current letter body
    const letterBody = req.body.letterBody;
    //push this letter into drafts

    currUser.drafts.unshift({user : targetUserId, msg:letterBody})
    await currUser.save();
    res.status(200).json(currUser);
    } catch (error) {
     res.send('Server error');
     console.log('Server Error : ',error.message)   
    }


}


//get a letter by id
exports.getDraftLetter = async(req,res)=>{
    try {
        /*
        1. Find the current logged in user
        2. Point to his drafts array
        3. loop through it and search for the letter by id
        4. return the profile
    */
   const presentUserId = req.user.id;
   const currentUser = await Profile.findOne({user : presentUserId});

   currentUser.drafts.forEach(ele=>{
    if(ele._id.toString() === req.params.draft_letter_id)
    {
        return res.json(ele);
    }
   });
    return  res.send('No letter found in your drafts');
    } catch (error) {
     
        res.send('Server Error');
        console.log('Server Error : ',error.message);
    }
}

//delete a draft letter
exports.deleteDraftLetter = async(req,res)=>{
    try {
        /*
            1. Find the current logged in user
            2. Point to his drafts array
            3. search for the letter id in the array
            4. remove if it's found
        */

            const presentLetterId = req.params.letter_id;
            const currentUser = await Profile.findOne({user : req.user.id});
            let count = 0;
            currentUser.drafts.forEach(element => {
                if(element._id.toString() === presentLetterId)
                {
                    currentUser.drafts.remove(element);
                    count++;
                     res.json(currentUser);
                }
            });
            await currentUser.save();
            if(count<1){
                res.send("No such letter was found");
            }
                  
            
    } catch (error) {
        res.send('Server Error');
        console.log('Server Error : ',error.message);
    }
}

//update the draft post
exports.updateDraft = async(req,res)=>{
    try {
        /*
            1. Find the current logged in user
            2. grab the target draft letter id
            3. search in the drafts array
            4. if it's found update it with the letter body
        */
       const presentUserId = req.user.id;
       const letterBody = req.body.letterBody;
       const updatePost = {};
       if(letterBody){updatePost.letterBody = letterBody}
       const currUser = await Profile.findOne({user : presentUserId});
      let count = 0;
       currUser.drafts.forEach(ele=>{
        if(ele._id.toString() === req.params.update_letter_id)
        {
            ele.msg = letterBody;
            count++;
        }
       })

       if(count==1){
        await currUser.save();
        res.json(currUser);
       }
       else{
        res.send(`Can't update this post`);
       }

    } catch (error) {
        res.send('Server Error');
        console.log('Server Error : ',error.message);
    }
}

//delete the multiple draft letters

exports.deleteMultipleLetters = async(req,res)=>{
    try {
        
        /*
            1. Find the current logged in user
            2. Point to the drafts array
            3. loop through the array and store them in the temp arr
            4. remove them from the array and return the user
        */
       const presentUserId = req.user.id;
       const currentUser = await Profile.findOne({user : req.user.id});
    //    console.log(req.query);
       const resp = await axios.get('https://localhost:8500/api/user/multiple/  ');
       res.send(resp.data);
    } catch (error) {
        res.send('Server Error');
        console.log('Server Error : ',error.message);
    }
}