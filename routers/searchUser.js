const express = require("express");
const router = express.Router();
const controller = require("../controllers/searchUser");
const auth = require("../middlewares/auth");
router.get("/:location_name" , auth ,controller.searchUser);
module.exports = router;