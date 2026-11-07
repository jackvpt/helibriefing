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
      type: String,
      required: true,
    },
    avatarUrl: { type: String, default: null },
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
        name: [{ type: String, required: true }],
      },
    ],
  },
  { timestamps: true }, // createdAt / updatedAt
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model("Aircraft", aircraftSchema)
