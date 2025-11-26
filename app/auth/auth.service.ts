import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthModel } from "./auth.model.ts";
import { RegisterDTO, LoginDTO } from "./auth.dto.ts";

export class AuthService {
  async register(input: RegisterDTO) {
    if (!input.name || !input.email || !input.password) {
      throw new Error("Name, email, and password are required");
    }

    // check existing
    const existing = await AuthModel.findOne({ email: input.email });
    if (existing) {
      return {
        message: "User already exists",
        success: false
      };
    }

    // hash password
    const hashed = await bcrypt.hash(input.password, 10);

    await AuthModel.create({
      name: input.name,
      email: input.email,
      password: hashed
    });

    return {
      message: "User registered successfully",
      success: true
    };
  }

  async login(input: LoginDTO) {
    if (!input.email || !input.password) {
      throw new Error("Email and password are required");
    }

    const user = await AuthModel.findOne({ email: input.email });
    if (!user) throw new Error("Invalid email");

    const match = await bcrypt.compare(input.password, user.password);
    if (!match) throw new Error("Wrong password");

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.ACCESS_SECRET || "ACCESS_SECRET",
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_SECRET || "REFRESH_SECRET",
      { expiresIn: "7d" }
    );

    return {
      userId: user.id,
      accessToken,
      refreshToken
    };
  }
}
