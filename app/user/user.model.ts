// import mongoose, { Document, Schema } from 'mongoose';

// // Define User interface
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   username: string;  // Ensure this is in your schema
// }

// // Define User schema
// const userSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   username: { type: String, required: true, unique: true }, // Ensure username is required
// }, { timestamps: true });

// // Check if the User model is already defined to avoid overwriting it
// const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

// export default User;
