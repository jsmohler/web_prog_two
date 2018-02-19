import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

// This is the main review schema
let reviewSchema = Schema({
  description: {type:String, required:true},
  rating: {type:Number, required:true},
  dateCreated: {type:Date, default: Date.now()},
  user: {type:Schema.Types.ObjectId, ref:'User'}
});


let Review = mongoose.model('Review', reviewSchema);

// Export the Review model
export {Review};
