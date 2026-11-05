/** Imports */
const express = require("express")
const router = express.Router()
const multer = require("multer")
const aircraftTypesCtrl = require("../controllers/aircraftTypes")

/** Set routes */
router.get("/", aircraftTypesCtrl.getAllAircraftTypes)
router.post("/", multer().none(), aircraftTypesCtrl.createAircraftType)
router.put("/:id", multer().none(), aircraftTypesCtrl.updateAircraftType)
router.delete("/:id", aircraftTypesCtrl.deleteAircraftType)

module.exports = router
