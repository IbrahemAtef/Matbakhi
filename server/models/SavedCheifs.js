const mongoose = require('mongoose')

const SaveCheifsSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userID: { type: String, required: true },
  cheifID: { type: String, required: true },
})

module.exports = mongoose.model('SaveCheifs', SaveCheifsSchema);
