/** Import mongoose */
const mongoose = require("mongoose")

const configurationSchema = mongoose.Schema(
  {
    aircraftType: {
      type: String,
      required: true,
      unique: false,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    elements: [
      {
        name: { type: String, required: true },
        description: { type: String, required: false },
        weight: {
          unit: {
            type: String,
            enum: ["kg", "lbs"],
            required: true,
            default: "kg",
          },
          value: {
            type: Number,
            required: true,
            min: [0, "Weight cannot be negative"],
          },
        },
        arm: {
          unit: {
            type: String,
            enum: ["millimeters", "centimeters", "meters"],
            default: "meters",
          },
          value: { type: Number, required: true },
        },
      },
    ],
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true }, // createdAt / updatedAt
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model("Configuration", configurationSchema)
