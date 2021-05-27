const express = require("express");
const router = express.Router();
const CultsController = require("../controllers/CultController.js");

router.post("/cult", CultsController.save);
router.put("/cult", CultsController.update);
router.get("/cult", CultsController.getCult);

module.exports = router;