const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const permissions = require("../controllers/permissions");

//@route    POST /:user_id
//@desc     PhotoSharing Options
//@access   Private
router.post("/:user_id",auth, permissions.photoSharing);


//@route    POST /:permission_id
//@desc     accept or decline the permission by id
//@access   Private
router.post("/status/:permission_id", auth, permissions.acceptOrDecline);
module.exports = router;