const express = require('express');
const Recipe = require('../models/recipe.js');
const recipes = express.Router();

// Checks to see if a user is signed in and returns the next function if so or redirects them to the login page.
const isAuthenticated = (req,res,next) => {
  if (req.session.currentUser) {
    return next();
  } else (
    res.redirect('/sessions/new')
  )
}

// INDEX - Sends a get request to the datatbase to retreive and display the data to the user.
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

// NEW - Sends a get request to render the create new recipe page.
recipes.get('/new', isAuthenticated, (req,res) => {
  res.render('recipe/new.ejs',
    {currentUser: req.session.currentUser})
})

// SHOW - Accesses each specific object in the database to display the information about that particular recipe. Sends a get request utilizing the objects ID value.
recipes.get('/:id', isAuthenticated, (req,res) => {
  Recipe.findById(req.params.id, (err, foundRecipe) => {
    // console.log(req.params.id);
    // console.log(foundRecipe._id);
    res.render('recipe/show.ejs',
      {
        recipe: foundRecipe,
        currentUser: req.session.currentUser
      }
    )
  })
});

// EDIT - Sends the user to the Edit Recipe page by making a get request and accessing only that specific recipe's ID value
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

// DELETE - Makes a delete request to delete the specific recipe based on the objects ID value in the database.
recipes.delete('/:id', (req,res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, deletedRecipe) => {
    res.redirect('/recipe');
  });
});

// UPDATE - PUT - Updates the recipe based on the ID.
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

// POST - CREATE - Creates a new recipe once the user has entered in all of the information in the create new recipe page.
recipes.post('/', (req,res) => {
  Recipe.create(req.body, (err,createdRecipe) => {
    res.redirect('/recipe');
  })
})

// SEED

module.exports = recipes;
