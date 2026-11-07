/** Imports */
const Configuration = require("../models/Configuration")

/** GET All Configurations */
exports.getAllConfigurations = async (req, res) => {
  try {
    const allConfigurations = await Configuration.find()
    res.status(200).json(allConfigurations)
    console.log(`${allConfigurations.length} configurations retrieved`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error retrieving configurations." })
  }
}

/** POST New Configuration */
exports.createConfiguration = async (req, res) => {
  const configurationObject = req.body
  console.log("Creating configuration:", configurationObject) // Log the incoming configuration object

  try {
    const configuration = new Configuration({
      ...configurationObject,
    })

    await configuration.save()

    res.status(201).json(configuration)
    console.log(
      `Configuration created: ${configuration._id} - ${configuration.name}`,
    )
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error adding configuration!" })
  }
}
