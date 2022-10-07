const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Profile = require("../models/UserProfile")
const Letter = require("../controllers/sendLetter");

//@route    POST /:user_id
//@desc     send a new letter 
//@access   Private
router.post("/:user_id" , auth, Letter.sendNewLetter);


//@route    GET /:letter_id
//@desc     Get a letter by id 
//@access   Private
router.get("/:letter_id", auth, Letter.getLetter);


//@route    DELETE /:letter_id
//@desc     Delete a letter by id 
//@access   Private
router.delete("/:letter_id", auth, Letter.deleteLetter);
module.exports = router;