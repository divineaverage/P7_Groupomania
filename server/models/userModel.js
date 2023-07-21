import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';


const Schema = mongoose.Schema;

export const UserSchema = new Schema({
		name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
		password: { type: String, required: true },	
		lastLogin: {type: String, default: new Date()}
	},);

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});


export const User = mongoose.model('User', UserSchema);
export default User