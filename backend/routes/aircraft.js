/** Imports */
const express = require("express")
const router = express.Router()
const multer = require("multer")
const aircraftCtrl = require("../controllers/aircraft")

/** Set routes */
router.get("/", aircraftCtrl.getAllAircraft)
router.post("/", multer().none(), aircraftCtrl.createAircraft)
router.put("/:id", multer().none(), aircraftCtrl.updateAircraft)
router.delete("/:id", aircraftCtrl.deleteAircraft)

module.exports = router
