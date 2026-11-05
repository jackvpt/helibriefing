/** Import mongoose */
const mongoose = require("mongoose")

const aircraftSchema = mongoose.Schema(
  {
    registration: {
      type: String,
      required: true,
      unique: true, // one document per registration
    },
    aircraftType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AircraftType", // link to the weight & balance data of the type
      required: true,
    },
    emptyEquippedWeight: {
      unit: {
        type: String,
        enum: ["kg", "lbs"],
        required: true,
        default: "kg",
      },
      weight: {
        type: Number,
        required: true,
        min: [0, "Weight cannot be negative"],
      },
    },
    emptyEquippedCog: {
      unit: {
        type: String,
        enum: ["millimeters", "centimeters", "meters"],
        default: "meters",
      },
      longitudinal: { type: Number, required: true },
      lateral: { type: Number, required: true },
    },
    acceptedConfigurations: [
      {
        names: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }, // createdAt / updatedAt
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model("Aircraft", aircraftSchema)
