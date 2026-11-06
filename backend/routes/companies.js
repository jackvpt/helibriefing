/** Imports */
const express = require("express")
const router = express.Router()
const multer = require("multer")
const companiesCtrl = require("../controllers/companies")

/** Set routes */
router.get("/", companiesCtrl.getAllCompanies)
router.post("/", multer().none(), companiesCtrl.createCompany)

module.exports = router
