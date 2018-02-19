import express from 'express';
import * as controller from './recipes.controller';

let router = express.Router();

// GET methods
router.get('/', controller.read);
router.get('/:id', controller.readOne);

// // POST method
// router.post('/', controller.create);
//
// // PUT method
// router.put('/:id', controller.update);
//
// // DELETE method
// router.delete('/:id', controller.destroy);

export {router};
