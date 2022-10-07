const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const drafts = require("../controllers/drafts")


//@route        GET /
//@desc         Test Route
//@access       Private
// router.get("/", auth, drafts.saveDraft);



//@route        POST/
//@desc         Save the current letter into drafts
//@access       Private
router.post("/:target_user_id", auth, drafts.saveDraft);

//@route        GET /:letter_id
//@desc         Get a draft letter by id
//@access       private
router.get("/:draft_letter_id",auth, drafts.getDraftLetter);

//@route        DELETE /:letter_id
//@desc         Delete a letter by id
//@access       Private
router.delete("/?letter=:letter_id" , auth, drafts.deleteDraftLetter);



//@route        PUT /:letter_id
//@desc         Update a letter by id
//@access       Private
router.param(['first,second'] , auth, drafts.updateDraft);


//@route        DELETE /:letter_id
//@desc         delete multiple items
//@access       Private
router.delete("/multiple/" , auth, drafts.deleteMultipleLetters);
module.exports = router;