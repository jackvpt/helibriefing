/** Imports */
const express = require("express")
const router = express.Router()
const multer = require("multer")
const configurationsCtrl = require("../controllers/configurations")

/** Set routes */
router.get("/", configurationsCtrl.getAllConfigurations)
router.post("/", multer().none(), configurationsCtrl.createConfiguration)

module.exports = router
