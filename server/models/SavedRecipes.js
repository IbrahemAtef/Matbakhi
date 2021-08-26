const mongoose = require('mongoose')

const SaveRecipeSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  userID: { type: String, required: true },
  recipeID: { type: String, required: true },
})

module.exports = mongoose.model('SaveRecipes', SaveRecipeSchema)
