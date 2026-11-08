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

        arm: {
          unit: {
            type: String,
            enum: ["millimeters", "centimeters", "meters"],
            default: "meters",
          },
          longitudinal: { type: Number, required: true },
          lateral: { type: Number, required: false },
        },
      },
    ],
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true }, // createdAt / updatedAt
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model("Configuration", configurationSchema)

/** Example of a configuration */
const example = {
  aircraftType: "H145D3",
  name: "Club",
  description: "8 sièges passagers, face à face, 1 pilote, 1 passager avant",
  elements: [
    {
      name: "Right pilot",
      arm: { unit: "millimeters", longitudinal: 2312, lateral: 390 },
    },
    {
      name: "Left pilot",
      arm: { unit: "millimeters", longitudinal: 2312, lateral: -390 },
    },
    {
      name: "Seat A",
      arm: { unit: "millimeters", longitudinal: 3250, lateral: -550 },
    },
    {
      name: "Seat A",
      arm: { unit: "millimeters", longitudinal: 3250, lateral: -550 },
    },
    {
      name: "Seat B",
      arm: { unit: "millimeters", longitudinal: 3250, lateral: 0 },
    },
    {
      name: "Seat C",
      arm: { unit: "millimeters", longitudinal: 3250, lateral: 550 },
    },
  ],
  avatarUrl: "/uploads/aircrafts_configurations/h145_configuration_8seats.png",
}
