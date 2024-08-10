import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
//if not, try with: import uniqueValidator from 'mongoose'

const userSchema = new mongoose.Schema({
 username:{
    type: String,
    required: true,
    minlength: 3,
    unique: true
 },
 name: String,
 passwordHash: {
    type: String,
    required: true
 },
 blogs:[
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
    }
 ],
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {              
    returnedObject.id =returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;                       //Important: the passwordHash must be private!
    }
   })

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema);

export default User;
