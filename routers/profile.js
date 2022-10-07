const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const profile = require("../controllers/profile");
router.post("/",auth, profile.createProfile);
module.exports = router;