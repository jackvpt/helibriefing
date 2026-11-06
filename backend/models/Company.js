/** Import mongoose */
const mongoose = require("mongoose")

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    ownedAircraft: [
      {
        aircraftType: { type: String, required: true },
        registration: { type: String, required: true },
      },
    ],
  },

  { timestamps: true }, // createdAt / updatedAt
)

/** Model methods converts Schema in usable model */
module.exports = mongoose.model("Company", companySchema)
