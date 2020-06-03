const express = require('express');
const Recipe = require('../models/recipe.js');
const recipes = express.Router();

// INDEX
recipes.get('/', (req,res) => {
  Recipe.find({}, (err, allRecipes) => {
    res.render('recipe/index.ejs',
      {
        recipes: allRecipes
      }
    )
  })
})

// NEW
recipes.get('/new', (req,res) => {
  res.render('recipe/new.ejs')
})

// SHOW
recipes.get('/:id', (req,res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    res.render('recipe/show.ejs',
      {
        recipe: foundRecipe
      }
    )
  })
});

// EDIT
recipes.get('/:id/edit', (req,res) => {
  Recipe.findById(req.params.id, (err,foundRecipe) => {
    res.render('recipe/edit.ejs',
      {
        recipe: foundRecipe
      }
    )
  })
});

// DELETE
recipes.delete('/:id', (req,res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    res.redirect('/recipe');
  });
});

// UPDATE - PUT
recipes.put('/:id', (req,res) => {
  Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updatedModel) => {
      res.redirect('/recipe')
    }
  )
});

// POST - CREATE
recipes.post('/', (req,res) => {
  Recipe.create(req.body, (err,createdRecipe) => {
    res.redirect('/recipe');
  })
})

// SEED

module.exports = recipes;
