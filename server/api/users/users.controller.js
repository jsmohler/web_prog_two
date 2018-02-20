'use strict';

import {OtherUser} from './users.model';

// Find all Users
export function read(req, res) {
  OtherUser.find()
    .exec()
    // This then method will only be called if the query was successful, so no need to error check!
    .then(function(users) {
      res.json(users);
    })
    .catch(function(err) {
      res.status(500);
      console.error(err);
      res.send(err.toString());
    });
}

// Find details for one user
export function readOne(req, res) {
  OtherUser.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        // User was found by Id
        res.status(200);
        res.json(existingUser);
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    .catch(function(err) {
      res.status(400);
      console.error(err);
      res.send(err.toString());
    });
}

// Create a new user
export function create(req, res) {
  let user = req.body;
  // Start off by saving the address
  OtherUser.create(user)
    // User and Address saved successfully! return 201 with the created user object
    .then(function(createdUser) {
      res.status(201);
      res.json(createdUser);
    })
    // An error was encountered during either the save of the address or the save of the user
    .catch(function(err) {
      res.status(400);
      console.error(err);
      res.send(err.toString());
    });
}

// Update a user
export function update(req, res) {
  var updatedUser;

  OtherUser.findById(req.params.id)
    .exec()
    // Update user
    .then(function(existingUser) {
      // If user exists, update all fields of the object
      if(existingUser) {
        existingUser.name.firstName = req.body.name.firstName;
        existingUser.name.middleName = req.body.name.middleName;
        existingUser.name.lastName = req.body.name.lastName;
        existingUser.email = req.body.email;
        existingUser.username = req.body.username;

        updatedUser = existingUser;

        return Promise.all([
          existingUser.increment().save()
        ]);
      } else {
        // User was not found
        return null;
      }
    })
    .then(function(savedObjects) {
      if(savedObjects) {
        res.status(200);
        res.json(updatedUser);
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // Error encountered during the save of the user
    .catch(function(err) {
      res.status(400);
      console.error(err);
      res.send(err.toString());
    });
}

// Remove a user
export function destroy(req, res) {
  OtherUser.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        return Promise.all([
          existingUser.remove()
        ]);
      } else {
        return null;
      }
    })
    // Delete was successful
    .then(function(deletedUser) {
      if(deletedUser) {
        res.status(204).send();
      } else {
        // User was not found
        res.status(404);
        res.json({message: 'Not Found'});
      }
    })
    // User delete failed
    .catch(function(err) {
      res.status(400);
      console.error(err);
      res.send(err.toString());
    });
}

