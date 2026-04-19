import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository.js";
import { AppError } from "../utils/AppError.js";
import { getJwtSecret } from "../utils/env.js";

const JWT_SECRET = getJwtSecret();

export class AuthService {
  static async login(email: string, password: string) {
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
