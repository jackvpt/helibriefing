/** Import mongoose */
const mongoose = require("mongoose")

/** A point of the envelope: weight / arm pair */
const envelopePointSchema = mongoose.Schema(
  {
    weight: { type: Number, required: true }, // in the aircraft type weightUnit
    arm: { type: Number, required: true }, // distance from datum, in the envelope unit
  },
  { _id: false },
)

/** Shared validation: a polygon needs at least 3 points */
const polygonValidator = {
  validator: (points) => Array.isArray(points) && points.length >= 3,
  message: "An envelope must contain at least 3 points",
}

/** Unit of the weights (min/max weight, envelope points, diagram y axis) */
const weightUnitField = {
  type: String,
  enum: ["kg", "lbs"],
  default: "kg",
}

/** Unit of the arms (envelope points, diagram x axis) */
const distanceUnitField = {
  type: String,
  enum: ["millimeters", "centimeters", "meters"],
  default: "centimeters",
}

/** Axis limits of a diagram: x = arm (envelope unit), y = weight (aircraft type weightUnit) */
const diagramLimitsSchema = mongoose.Schema(
  {
    xMinimum: { type: Number, required: true },
    xMaximum: { type: Number, required: true },
    yMinimum: { type: Number, required: true },
    yMaximum: { type: Number, required: true },
  },
  { _id: false },
)

/** One diagram: its polygon + its axis limits */
const diagramSchema = mongoose.Schema(
  {
    points: {
      type: [envelopePointSchema],
      validate: polygonValidator,
      required: true,
    },
    diagramLimits: { type: diagramLimitsSchema, required: true },
  },
  { _id: false },
)

/** Extended diagram: same as above, but axis limits are optional */
const extendedDiagramSchema = mongoose.Schema(
  {
    points: {
      type: [envelopePointSchema],
      validate: polygonValidator,
      required: true,
    },
    diagramLimits: { type: diagramLimitsSchema, default: undefined },
  },
  { _id: false },
)

/** A full envelope: longitudinal + lateral (optional) */
const envelopeSchema = mongoose.Schema(
  {
    distanceUnit: distanceUnitField,
    longitudinal: { type: diagramSchema, required: true },
    lateral: { type: diagramSchema, default: undefined },
  },
  { _id: false },
)

/** One extended envelope (the aircraft type can have several) */
const extendedEnvelopeSchema = mongoose.Schema({
  name: { type: String, required: true }, // e.g. "Extended envelope (example conditions of use)"
  description: { type: String, required: true }, // e.g. "With XYZ kit" / conditions of use
  distanceUnit: distanceUnitField,
  longitudinal: { type: extendedDiagramSchema, default: undefined },
  lateral: { type: extendedDiagramSchema, default: undefined },
})

/** One row of the fuel loading table (values as printed in the flight manual) */
const fuelMomentRowSchema = mongoose.Schema(
  {
    volumeL: { type: Number, required: true },
    volumeUsGal: { type: Number, required: true },
    mass: { type: Number, required: true }, // in the aircraft type weightUnit
    arm: { type: Number, required: true }, // in the fuel table distanceUnit
    moment: { type: Number, required: true }, // mass × arm
  },
  { _id: false },
)

/** Fuel loading table: rows sorted by ascending mass, at least 2 rows to interpolate */
const fuelMomentsSchema = mongoose.Schema(
  {
    distanceUnit: { ...distanceUnitField, default: "millimeters" },
    groups: [
      {
        name: { type: String, required: false },
        abbreviatedName: { type: String, required: false },
        rows: {
          type: [fuelMomentRowSchema],
          required: true,
          validate: {
            validator: (rows) =>
              Array.isArray(rows) &&
              rows.length >= 2 &&
              rows.every((row, i) => i === 0 || row.mass > rows[i - 1].mass),
            message:
              "Fuel moments need at least 2 rows sorted by ascending mass",
          },
        },
      },
    ],
  },
  { _id: false },
)

const aircraftTypeSchema = mongoose.Schema({
  type: { type: String, required: true },
  weightUnit: weightUnitField,
  minimumWeight: { type: Number, required: true },
  maximumWeight: { type: Number, required: true },
  cogLimitations: { type: envelopeSchema, required: true },
  extendedCogLimitations: {
    type: [extendedEnvelopeSchema],
    default: [],
  },
  fuelMoments: { type: fuelMomentsSchema, default: undefined },
})

/** Model methods converts Schema in usable model */
module.exports = mongoose.model("AircraftType", aircraftTypeSchema)

const example = {
  type: "BK117 C2",
  weightUnit: "kg",
  minimumWeight: 1750,
  maximumWeight: 3585,
  cogLimitations: {
    distanceUnit: "millimeters",
    longitudinal: {
      points: [
        { weight: 3585, arm: 4377 },
        { weight: 3585, arm: 4544 },
        { weight: 1750, arm: 4667 },
        { weight: 2000, arm: 4337 },
      ],
      diagramLimits: {
        xMinimum: 4200,
        xMaximum: 4800,
        yMinimum: 1500,
        yMaximum: 3750,
      },
    },
    lateral: {
      points: [
        { weight: 3585, arm: -80 },
        { weight: 3585, arm: 80 },
        { weight: 3000, arm: 80 },
        { weight: 3000, arm: 100 },
        { weight: 1750, arm: 100 },
        { weight: 1750, arm: -100 },
        { weight: 3000, arm: -100 },
        { weight: 3000, arm: -80 },
      ],
      diagramLimits: {
        xMinimum: -180,
        xMaximum: 180,
        yMinimum: 1500,
        yMaximum: 3750,
      },
    },
  },
  extendedCogLimitations: [
    {
      name: "Basic hoist operation",
      description: "Basic CG envelope for hoist operations",
      distanceUnit: "millimeters",
      longitudinal: {
        points: [
          { weight: 3585, arm: 4377 },
          { weight: 3585, arm: 4544 },
          { weight: 1750, arm: 4667 },
          { weight: 2000, arm: 4337 },
        ],
        diagramLimits: {
          xMinimum: 4300,
          xMaximum: 4700,
          yMinimum: 1600,
          yMaximum: 3800,
        },
      },
    },
    {
      name: "Hoist operation 50 kt",
      description: "Extended CG envelope for hoist operation up to 50 kt",
      distanceUnit: "millimeters",
      longitudinal: {
        points: [
          { weight: 3585, arm: 4377 },
          { weight: 3585, arm: 4290 },
          { weight: 3585, arm: 4544 },
          { weight: 1750, arm: 4667 },
          { weight: 2000, arm: 4337 },
          { weight: 2036, arm: 4290 },
        ],
        diagramLimits: {
          xMinimum: 4250,
          xMaximum: 4700,
          yMinimum: 1600,
          yMaximum: 3800,
        },
      },
    },
  ],
}
