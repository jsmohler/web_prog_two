import express from 'express';
import * as recipeController from './recipes.controller';
import * as reviewController from '../reviews/reviews.controller';

let router = express.Router();

// GET methods
router.get('/', recipeController.read);
router.get('/:recipeId', recipeController.readOne);
router.get('/:recipeId/reviews', reviewController.read);
router.get('/:recipeId/reviews/:reviewId', reviewController.readOne);

// POST method
router.post('/', recipeController.create);
router.post('/:recipeId/reviews', reviewController.create);

// PUT method
router.put('/:recipeId', recipeController.update);
router.put('/:recipeId/reviews/:reviewId', reviewController.update);

// DELETE method
router.delete('/:recipeId', recipeController.destroy);
router.delete('/:recipeId/reviews/:reviewId', reviewController.destroy);

export {router};
