/** Imports */
const AircraftType = require("../models/AircraftType")

/** GET All Aircraft Types */
exports.getAllAircraftTypes = async (req, res) => {
  try {
    const allAircraftTypes = await AircraftType.find()
    res.status(200).json(allAircraftTypes)
    console.log(`${allAircraftTypes.length} aircraft types retrieved`)
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error retrieving aircraft types." })
  }
}

/** POST New Aircraft Type */
exports.createAircraftType = async (req, res) => {
  const aircraftTypeObject = req.body
  console.log("Creating aircraft type:", aircraftTypeObject) // Log the incoming aircraft type object

  try {
    const aircraftType = new AircraftType({
      ...aircraftTypeObject,
    })

    await aircraftType.save()

    res.status(201).json(aircraftType)
    console.log(
      `Aircraft type created: ${aircraftType._id} - ${aircraftType.type}`,
    )
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Error adding aircraft type!" })
  }
}

/** PUT Update Aircraft Type */
exports.updateAircraftType = async (req, res) => {
  const aircraftTypeObject = req.body

  try {
    const oldAircraftType = await AircraftType.findById(req.params.id)
    if (!oldAircraftType) {
      return res.status(404).json({ error: "Aircraft type not found" })
    }

    const updatedAircraftType = await AircraftType.findByIdAndUpdate(
      req.params.id,
      { ...aircraftTypeObject, _id: req.params.id },
      { new: true, runValidators: true },
    )

    res.status(200).json(updatedAircraftType)
    console.log(
      `Aircraft type updated: ${updatedAircraftType._id} - ${updatedAircraftType.type}`,
    )
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message || "Error updating aircraft type!" })
  }
}

/** DELETE One Aircraft Type */
exports.deleteAircraftType = async (req, res) => {
  try {
    const deletedAircraftType = await AircraftType.findByIdAndDelete(
      req.params.id,
    )
    if (!deletedAircraftType) {
      return res.status(404).json({ error: "Aircraft type not found" })
    }

    console.log(`Aircraft type deleted: ${req.params.id}`)
    res.status(200).json({ message: "Aircraft type deleted successfully!" })
  } catch (error) {
    res
      .status(errorStatus(error))
      .json({ error: error.message || "Error deleting aircraft type!" })
  }
}
