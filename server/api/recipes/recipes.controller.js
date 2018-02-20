'use strict';

import {Recipe} from './recipes.model';

// Find all recipes
export function read(req, res) {
  Recipe.find()
    .exec()
    .then(function(recipes) {
      res.json(recipes);
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for a recipe
export function readOne(req, res) {
  Recipe.findById(req.params.recipeId)
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        // Recipe was found by Id
        res.status(200);
        res.json(existingRecipe);
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new recipe
export function create(req, res) {
  let recipe = req.body;
  Recipe.create(recipe)
    // Recipe saved successfully! return 201 with the created user object
    .then(function(createdRecipe) {
      res.status(201);
      res.json(createdRecipe);
    })
    // An error was encountered during either the save of the address or the save of the user
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Update a recipe
export function update(req, res) {
  // This value will be set by the successful update of the recipe so that it can be returned
  var updatedRecipe;
  // Start by trying to find the user by its id
  Recipe.findById(req.params.recipeId)
    .exec()
    // Update recipe
    .then(function(existingRecipe) {
      // If recipe exists, update all fields of the object
      if(existingRecipe) {
        existingRecipe.name = req.body.name;
        existingRecipe.description = req.body.description;
        existingRecipe.picture = req.body.picture;
        existingRecipe.prepTime = req.body.prepTime;
        existingRecipe.cookingTime = req.body.cookingTime;
        existingRecipe.directions = req.body.directions;
        existingRecipe.ingredients.ingredients = req.body.ingredients.ingredients;
        existingRecipe.reviews = req.body.reviews;

        // Set externally declared updatedRecipe so that later promise can return it
        updatedRecipe = existingRecipe;
        return Promise.all([
          existingRecipe.increment().save()
        ]);
      } else {
        // Recipe was not found
        return null;
      }
    })
    // This .then will be called after the Promise.all resolves, or be called with null if the recipe was not found
    .then(function(savedObjects) {
      // savedObjects should be defined if Promise.all was invoked (recipe was found)
      if(savedObjects) {
        res.status(200);
        res.json(updatedRecipe);
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Error encountered during the save of the user or address
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a recipe
export function destroy(req, res) {
  Recipe.findById(req.params.recipeId)
    .exec()
    .then(function(existingRecipe) {
      if(existingRecipe) {
        return Promise.all([
          existingRecipe.remove()
        ]);
      } else {
        return null;
      }
    })
    // Delete was successful
    .then(function(deletedRecipe) {
      if(deletedRecipe) {
        //delete all reviews for this recipe
        res.status(204).send();
      } else {
        // Recipe was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Recipe delete failed
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

