const express = require('express');
const Recipe = require('../models/recipe.js');
const recipes = express.Router();

const isAuthenticated = (req,res,next) => {
  if (req.session.currentUser) {
    return next();
  } else (
    res.redirect('/sessions/new')
  )
}

// INDEX
recipes.get('/', (req,res) => {
  Recipe.find({}, (err, allRecipes) => {
    res.render('recipe/index.ejs',
      {
        recipes: allRecipes,
        currentUser: req.session.currentUser
      }
    )
  })
})

// NEW
recipes.get('/new', isAuthenticated, (req,res) => {
  res.render('recipe/new.ejs',
    {currentUser: req.session.currentUser})
})

// SHOW
recipes.get('/:id', isAuthenticated, (req,res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    res.render('recipe/show.ejs',
      {
        recipe: foundRecipe,
        currentUser: req.session.currentUser
      }
    )
  })
});

// EDIT
recipes.get('/:id/edit', isAuthenticated, (req,res) => {
  Recipe.findById(req.params.id, (err,foundRecipe) => {
    res.render('recipe/edit.ejs',
      {
        recipe: foundRecipe,
        currentUser: req.session.currentUser
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
