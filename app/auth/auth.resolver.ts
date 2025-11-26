// src/resolvers/auth.resolver.ts
import bcrypt from "bcryptjs";
import { AuthModel } from "./auth.model";
import jwt from "jsonwebtoken";

export const authResolvers = {
    Query: {
    // Fetch all users except the logged-in user
    getUsers: async (_: unknown, __: unknown, context: any) => {
      const userId = context.userId; // Assuming userId is set via authentication middleware
      if (!userId) throw new Error("Not authenticated");

      // Fetch all users except the logged-in user
      return await AuthModel.find({ _id: { $ne: userId } });
    }
  },
  
  Mutation: {
    register: async (_: unknown, { input }: { input: { name: string; email: string; password: string } }) => {
      const { name, email, password } = input;

      // Check if the user already exists
      const existingUser = await AuthModel.findOne({ email });
      if (existingUser) {
        return {
          success: false,
          message: "Email already exists",
        };
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = new AuthModel({
        name,
        email,
        password: hashedPassword,
      });

      // Save the user and return the user details, including the id
      const savedUser = await newUser.save();

      return {
        id: savedUser._id.toString(),  // Ensure to return the string version of _id
        name: savedUser.name,
        email: savedUser.email,
        message: "Registration successful",
      };
    },

    login: async (_: unknown, { input }: { input: { email: string; password: string } }) => {
      const { email, password } = input;

      const user = await AuthModel.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Incorrect password");

      const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
       const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
      return { accessToken, refreshToken, user: { id: user._id.toString(), name: user.name, email: user.email } };
    },
  },
};
