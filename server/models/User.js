const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  picture: { type: String , default: null},
})

module.exports = mongoose.model('Users', UserSchema)
