/** Imports */
const Company = require("../models/Company")

/** GET All Companies */
exports.getAllCompanies = async (req, res) => {
  try {
    const allCompanies = await Company.find()
    res.status(200).json(allCompanies)
    console.log(`${allCompanies.length} companies retrieved`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error retrieving companies." })
  }
}

/** POST New Company */
exports.createCompany = async (req, res) => {
  const companyObject = req.body
  console.log("Creating company:", companyObject) // Log the incoming company object

  try {
    const company = new Company({
      ...companyObject,
    })

    await company.save()

    res.status(201).json(company)
    console.log(
      `Company created: ${company._id} - ${company.name}`,
    )
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error adding company!" })
  }
}
