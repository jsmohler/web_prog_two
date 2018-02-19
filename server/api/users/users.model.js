import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

// This schema represents the name of the user
let nameSchema = Schema({
  // firstName is a simple String type that is required
  firstName: {type: String, required: true},
  // middleName is a simple String type that is not required
  middleName: {type: String, required: false},
  // lastName is a simple String type that is required
  lastName: {type: String, required: true}
});

// This is the main user schema
let userSchema = Schema({
  username: {type:String, required:true, unique:true},
  email: {type:String, required:true, unique:true},
  name: nameSchema
});

let OtherUser = mongoose.model('User', userSchema);

// Export User
export {OtherUser};
