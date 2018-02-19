import express from 'express';
import * as recipeController from './recipes.controller';
import * as reviewController from '../reviews/reviews.controller';

let router = express.Router();

// GET methods
router.get('/', recipeController.read);
router.get('/:recipeId', recipeController.readOne);
router.get('/:recipeId/reviews', reviewController.read);
router.get('/:recipeId/reviews/:reviewId', reviewController.readOne);

// // POST method
// router.post('/', controller.create);
//
// // PUT method
// router.put('/:id', controller.update);
//
// // DELETE method
// router.delete('/:id', controller.destroy);

export {router};
