'use strict';

import {Review} from './reviews.model';
import {Recipe} from '../recipes/recipes.model'

// Find all Reviews for the recipe
export function read(req, res) {
  let recipe = Recipe.findById(req.params.recipeId);
  let reviewIds = recipe.reviews;

  for (var i = 0; i < reviewIds.size(); i++)
  {
    Review.findById(reviewIds[i])
      .exec()
      .then(function(existingReview) {
        if(existingReview) {
          // Review was found by Id
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
  }}

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
//
// // Create a new user
// export function create(req, res) {
//   let address = req.body.address;
//   let user = req.body;
//   // Start off by saving the address
//   Address.create(address)
//     .then(function(createdAddress) {
//       user.address = createdAddress;
//       return User.create(user);
//     })
//     .then(function(createdUser) {
//       res.status(201);
//       res.json(createdUser);
//     })
//     .catch(function(err) {
//       res.status(400);
//       res.send(err);
//     });
// }
//
// // Update a user
// export function update(req, res) {
//   var updatedUser;
//   User.findById(req.params.id)
//     .populate('address')
//     .exec()
//     .then(function(existingUser) {
//       if(existingUser) {
//         existingUser.address.addressLine1 = req.body.address.addressLine1;
//         existingUser.address.addressLine2 = req.body.address.addressLine2;
//         existingUser.address.city = req.body.address.city;
//         existingUser.address.state = req.body.address.state;
//         existingUser.address.zip = req.body.address.zip;
//         existingUser.age = req.body.age;
//         existingUser.name.firstName = req.body.name.firstName;
//         existingUser.name.middleName = req.body.name.middleName;
//         existingUser.name.lastName = req.body.name.lastName;
//         updatedUser = existingUser;
//         return Promise.all([
//           existingUser.address.increment().save(),
//           existingUser.increment().save()
//         ]);
//       } else {
//         return null;
//       }
//     })
//     .then(function(savedObjects) {
//       if(savedObjects) {
//         res.status(200);
//         res.json(updatedUser);
//       } else {
//         res.status(404);
//         res.json({message: 'Not Found'});
//       }
//     })
//     .catch(function(err) {
//       res.status(400);
//       res.send(err);
//     });
// }
//
// // Remove a user
// export function destroy(req, res) {
//   User.findById(req.params.id)
//     .populate('address')
//     .exec()
//     .then(function(existingUser) {
//       if(existingUser) {
//         return Promise.all([
//           existingUser.address.remove(),
//           existingUser.remove()
//         ]);
//       } else {
//         return null;
//       }
//     })
//     .then(function(deletedUser) {
//       if(deletedUser) {
//         res.status(204).send();
//       } else {
//         res.status(404);
//         res.json({message: 'Not Found'});
//       }
//     })
//     .catch(function(err) {
//       res.status(400);
//       res.send(err);
//     });
// }

