const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
const Gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const gravatar = Gravatar.url(
      email,
      { s: "200", r: "pg", d: "retro" },
      false
    );
    if (!name || !email || !password) {
      return res.send("Please Fill all  your details");
    } else {
      const isExisted = await User.findOne({ email });
      if (isExisted) {
        return res.send("This email is already registered");
      } else {
        
        const user = new User({ name, email, password, gravatar });
        //bcrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt); //password hashed
        //jwt payload
        const payload = {
          user: {
            id: user.id,
          },
        };
        //jwt sign
        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            else {
              res.json({ token });
            }
          }
        );
        // sendMail.mailDetails.to = email; //assigned to property
        // sendMail.mailTransporter.sendMail(sendMail.mailDetails,(err,data)=>{
        //     if(err) {console.log('Error : ',err.message)}
        //     else{
        //         console.log('Mail Sent Successfully');
        //     }
        // })
        user.save();
        // res.json({message : 'registered successfully',user});
      }
    }
  } catch (error) {
    console.log("Server Error : ", error.message);
    res.send("Server Error");
  }
};


exports.login = async(req,res)=>{
    try {
       const{email,password} = req.body;
       if(!email || !password){return res.send('Please fill all the details')}
       else{
        const user = await User.findOne({email});
        if(!user){return res.send('There is no such email existed')}
        else{
            //compare passwords
            bcrypt.compare(password,user.password , (err,data)=>{
                if(err) throw err;
                if(!data){res.send('Your credentials were wrong')}
                else{
                    //send jwt token
                    const payload = {
                        user: {
                          id: user.id,
                        },
                      };
                      //jwt sign
                      jwt.sign(
                        payload,
                        process.env.jwtSecret,
                        { expiresIn: 36000 },
                        (err, token) => {
                          if (err) throw err;
                          else {
                            res.json({ token });
                          }
                        }
                      );
                      
                }
            })
        }
       }
    } catch (error) {
        console.log("Server Error : ", error.message);
        res.send("Server Error");
    }
}
