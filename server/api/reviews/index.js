import express from 'express';
import * as controller from './reviews.controller';

let router = express.Router();

// GET methods
router.get('/recipes/:recipeId/', controller.read);
router.get('/recipes/:recipeId/reviews/:reviewId', controller.readOne);

// // POST method
// router.post('/', controller.create);
//
// // PUT method
// router.put('/:id', controller.update);
//
// // DELETE method
// router.delete('/:id', controller.destroy);

export {router};
