'use strict';

import {Review} from './reviews.model';
import {Recipe} from '../recipes/recipes.model'

// Find all Reviews for the recipe
export function read(req, res) {
  let recipe = Recipe.findById(req.params.recipeId);
  let reviewIds = recipe.reviews;

  Review.find(
    {'_id': {$in: reviewIds}}
  )
    .exec()
    .then(function(reviews) {
      res.json(reviews);
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
  let newId;

  // Start off by saving the address
  Review.create(review)
    .then(function(createdReview) {
      newId = createdReview._id;
      res.status(201);
      res.json(createdReview);
      return Recipe.findById(req.params.recipeId);
    }).then(function(recipe) {

    }).catch(function(err) {
      res.status(400);
      res.send(err);
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
  let recipe = ecipe.findById(req.params.recipeId);

  Review.findById(req.params.reviewId)
    .exec()
    .then(function(existingReview) {
      if(existingReview) {
        return Promise.all([
          existingReview.remove()
        ]);
      } else {
        return null;
      }
    })
    .then(function(deletedReview) {
      if(deletedReview) {
        //Remove id from recipe reviews array
        res.status(204).send();
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

