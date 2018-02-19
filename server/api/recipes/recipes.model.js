import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

// This schema represents the ingredients needed fofr the recipe
let ingredientsSchema = Schema({
  ingredients: {type: [String], required:true}
});

// This is the main recipe schema
let recipeSchema = Schema({
  name: {type:String, required:true},
  description: {type:String, requiired:true},
  picture: {type:String, required:true},
  prepTime: {type:Number, required:true},
  cookingTime: {type:Number, required:true},
  directions: {type:[String], required:true},
  ingredients: ingredientsSchema,
  reviews: {type:[Schema.Types.ObjectId], ref:'Review', required: true, default:[]}
});

let Recipe = mongoose.model('Recipe', recipeSchema);

// Export the Recipe model
export {Recipe};
