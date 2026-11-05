/** Import mongoose */
const mongoose = require("mongoose")

/** Create a mongoose Schema */
const CredentialSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

/** Model methods converts Schema in usable model */
module.exports = mongoose.model(
  "Credential",
  CredentialSchema,
) /** 'Credential' is the collection name which becomes 'Credentials' */
