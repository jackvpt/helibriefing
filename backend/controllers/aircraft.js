/** Imports */
const Aircraft = require("../models/Aircraft")

/** GET All Aircraft */
exports.getAllAircraft = async (req, res) => {
  try {
    const allAircraft = await Aircraft.find()
    res.status(200).json(allAircraft)
    console.log(`${allAircraft.length} aircraft retrieved`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error retrieving aircraft." })
  }
}

/** POST New Aircraft */
exports.createAircraft = async (req, res) => {
  const aircraftObject = req.body
  console.log("Creating aircraft:", aircraftObject) // Log the incoming aircraft object

  try {
    const aircraft = new Aircraft({
      ...aircraftObject,
    })

    await aircraft.save()

    res.status(201).json(aircraft)
    console.log(
      `Aircraft created: ${aircraft._id} - ${aircraft.type}`,
    )
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error adding aircraft!" })
  }
}

/** PUT Update Aircraft */
exports.updateAircraft = async (req, res) => {
  const aircraftObject = req.body

  try {
    const oldAircraft = await Aircraft.findById(req.params.id)
    if (!oldAircraft) {
      return res.status(404).json({ error: "Aircraft not found" })
    }

    const updatedAircraft = await Aircraft.findByIdAndUpdate(
      req.params.id,
      { ...aircraftObject, _id: req.params.id },
      { new: true, runValidators: true },
    )

    res.status(200).json(updatedAircraft)
    console.log(
      `Aircraft updated: ${updatedAircraft._id} - ${updatedAircraft.type}`,
    )
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error updating aircraft!" })
  }
}

/** DELETE One Aircraft */
exports.deleteAircraft = async (req, res) => {
  try {
    const deletedAircraft = await Aircraft.findByIdAndDelete(
      req.params.id,
    )
    if (!deletedAircraft) {
      return res.status(404).json({ error: "Aircraft not found" })
    }

    console.log(`Aircraft deleted: ${req.params.id}`)
    res.status(200).json({ message: "Aircraft deleted successfully!" })
  } catch (error) {
    res
      .status(errorStatus(error))
      .json({ error: error.message || "Error deleting aircraft!" })
  }
}
