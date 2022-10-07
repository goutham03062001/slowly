const express = require("express");
const Profile = require("../models/UserProfile");
exports.sendNewLetter = async(req,res)=>{
    try {
        const {letterBody} = req.body;
        
        if(!letterBody) {res.send('Please write something in the letter')}
        if(letterBody.length<20){
            res.send("Please write more than 20 letters")
        }
        else{
            //store this letterBody in the received array of the targeted user
            const receiverId = req.params.user_id;
            const receivingUser = await Profile.findOne({user : receiverId});
            //build an object
            const receiverObj = {};
            receiverObj.letter = letterBody;
            receiverObj.user = req.user.id;
            

            //update the sender sent property
            const currentUser = await Profile.findOne({user : req.user.id});
            const currUserObj = {};
            currUserObj.user = receiverId;
            currUserObj.letter = letterBody;
            currentUser.sent.unshift(currUserObj);
            receivingUser.received.unshift(receiverObj);
            await receivingUser.save();
            //send a response to send
            await currentUser.save();
            res.json({message : "Letter Sent Successfully", currentUser});

        }
    } catch (error) {
        console.log('Server Error: ',error.message);
        res.send('Server Error');
    }
}

//get a particular letter
exports.getLetter = async(req,res)=>{
    try {
        /* first get all the letters */
        const profile = await Profile.findOne({user : req.user.id});
        //find the letter by the id
        profile.sent.forEach(letter =>{
            if(letter._id.toString() === req.params.letter_id)
            {
                return res.json({message : "Your letter ", letter});
            }
        })

    } catch (error) {
        console.log('Server Error: ',error.message);
        res.send('Server Error');
    }
}


//delete the letter by id
exports.deleteLetter = async(req,res)=>{
    try {
        /* first find the all the letters*/
        const profile = await Profile.findOne({user : req.user.id});
        //find the letter by the id

        var count = 0;
        profile.sent.forEach(letter =>{
           
            if(letter._id.toString() == req.params.letter_id)
            {   
                let ref = letter;
                profile.sent.pop(letter);
                count+=1;
                res.json({message : "Post Deleted",ref});
            }
            
        })
        await profile.save();
        if(count<1){
            res.send('No Letter Found');
        }
        
        
    } catch (error) {
        console.log('Server Error: ',error.message);
        res.send('Server Error');
    }
}
