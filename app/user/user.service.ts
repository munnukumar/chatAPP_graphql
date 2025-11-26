// // user.service.ts

// import User, { IUser } from './user.model';  // Correctly import User model and IUser interface
// import bcrypt from 'bcryptjs';  // for password hashing
// import { sign } from 'jsonwebtoken';  // to generate JWT tokens

// class UserService {
//   // Method to create a new user
//   async createUser(username: string, email: string, password: string): Promise<IUser> {
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       throw new Error('User with this username or email already exists');
//     }

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//     });

//     return newUser.save();
//   }

//   // Method to find a user by username or email
//   async findUser(username: string, email?: string): Promise<IUser | null> {
//     const query = email ? { email } : { username };
//     return User.findOne(query);
//   }

//   // Method to check if password is correct
//   async validatePassword(enteredPassword: string, storedPassword: string): Promise<boolean> {
//     return bcrypt.compare(enteredPassword, storedPassword);
//   }

//   // Method to generate JWT token
//   generateAuthToken(user: IUser): string {
//     const token = sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
//     return token;
//   }
// }

// export default new UserService();
