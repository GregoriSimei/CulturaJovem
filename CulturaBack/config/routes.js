const express = require("express");
const router = express.Router();
const CultsController = require("../controllers/CultController.js");

router.post("/cult", CultsController.save);
router.get("/cult", CultsController.getAll);

module.exports = router;