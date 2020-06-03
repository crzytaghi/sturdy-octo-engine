const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {type: String, required: true},
  ingredient: {type: String, required: true},
  process: {type: String, required: true},
  img: String,
  time: {type: Number, required: true}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
