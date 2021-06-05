const express = require("express");
const router = express.Router();
const CultsController = require("../controllers/CultController.js");

router.post("/", CultsController.save);
router.put("/", CultsController.update);
router.get("/", CultsController.getCult);

module.exports = router;