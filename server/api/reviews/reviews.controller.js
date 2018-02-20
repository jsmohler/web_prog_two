'use strict';

import {Review} from './reviews.model';
import {Recipe} from '../recipes/recipes.model';

// Find all Reviews for the recipe
export function read(req, res) {
  let reviewIds;
  Recipe.findById(req.params.recipeId)
    .then(function(recipe) {
      reviewIds = recipe.reviews;
      Review.find(
        {'_id': {$in: reviewIds}}
      )
        .exec()
        .then(function(review) {
          res.json(review);
        })
        .catch(function(err) {
          res.status(500);
          res.send(err);
        });
    })
    .catch(function(err) {
      res.status(500);
      res.send(err);
    });
}

// Find details for one review
export function readOne(req, res) {
  Review.findById(req.params.reviewId)
    .exec()
    .then(function(existingReview) {
      if(existingReview) {
        // User was found by Id
        res.status(200);
        res.json(existingReview);
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Create a new review
export function create(req, res) {
  let review = req.body;
  let foundRecipe;
  let newReview;

  Recipe.findById(req.params.recipeId)
    .exec()
    .then(function(existingRecipe) {
      if (existingRecipe) {
        foundRecipe = existingRecipe;
        return Review.create(review);
      } else {
        return Promise.reject("Recipe Not Found");
      }
    })
    .then(function(createdReview) {
      foundRecipe.reviews.push(createdReview);
      newReview = createdReview;
      return foundRecipe.increment().save();
    })
    .then(function() {
      res.status(201);
      res.json(newReview);
    })
    .catch(function(err) {
      res.status(400);
      console.error(err);
      res.send(err.toString());
    });
}

// Update a review
export function update(req, res) {
  var updatedReview;
  Review.findById(req.params.reviewId)
    .exec()
    .then(function(existingReview) {
      if(existingReview) {
        existingReview.description = req.body.description;
        existingReview.rating = req.body.rating;
        existingReview.user = req.body.user;
        updatedReview = existingReview;
        return Promise.all([
          existingReview.increment().save()
        ]);
      } else {
        return null;
      }
    })
    .then(function(savedObjects) {
      if(savedObjects) {
        res.status(200);
        res.json(updatedReview);
      } else {
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

// Remove a user
export function destroy(req, res) {
  let foundRecipe;
  let foundReview;

  Recipe.findById(req.params.recipeId)
    .exec()
    .then(function(existingRecipe) {
      if (existingRecipe) {
        foundRecipe = existingRecipe;
        return Review.findById(req.params.reviewId);
      } else {
        return Promise.reject("Recipe not found");
      }
    })
    .then(function(existingReview) {
      if (existingReview) {
        foundReview = existingReview;
        return Promise.all([
          existingReview.remove()
        ]);
      } else {
        return null;
      }
    })
    .then(function(deletedReview) {
      if (deletedReview) {
        let index = foundRecipe.reviews.indexOf(foundReview);
        foundRecipe.reviews.splice(index, 1);
        return foundRecipe.increment().save();
      } else {
        // Review was not found
        res.status(404);
        res.json({message: 'Not Found'});
        return null;
      }
    })
    .then(function(updatedRecipe) {
      if (updatedRecipe) {
        res.status(204).send();
      }
    })
    // Review delete failed
    .catch(function(err) {
      res.status(400);
      res.send(err);
    });
}

