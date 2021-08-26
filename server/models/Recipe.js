const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  cheifID: { type: String, required: true },
})

module.exports = mongoose.model('Recipes', RecipeSchema)
