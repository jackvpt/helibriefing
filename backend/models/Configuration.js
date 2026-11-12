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
        displayCode: { type: String, required: true },
        elementType: {
          type: String,
          required: true,
        },
        function: {
          type: String,
          required: false,
        },
        orientation: {
          type: Number,
          default: 0,
        },
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
    noSeatImage: {
      url: { type: String, default: null },
      min_longitudinal: { type: Number, default: null },
      max_longitudinal: { type: Number, default: null },
      min_lateral: { type: Number, default: null },
      max_lateral: { type: Number, default: null },
    },
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
      displayCode: "RP",
      name: "Right pilot",
      arm: { unit: "millimeters", longitudinal: 2312, lateral: 390 },
    },
    {
      displayCode: "LP",
      name: "Left pilot",
      arm: { unit: "millimeters", longitudinal: 2312, lateral: -390 },
    },
    {
      displayCode: "A",
      name: "Seat A",
      arm: { unit: "millimeters", longitudinal: 3250, lateral: -550 },
    },
    {
      displayCode: "B",
      name: "Seat B",
      arm: { unit: "millimeters", longitudinal: 3250, lateral: 0 },
    },
    {
      displayCode: "C",
      name: "Seat C",
      arm: { unit: "millimeters", longitudinal: 3250, lateral: 550 },
    },
  ],
  avatarUrl: "/uploads/aircrafts_configurations/h145_configuration_8seats.png",
}
