import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { AuthenticationError } from "../utils/errorResponse.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const userInfo = await User.findOne({ username });

    if (!userInfo) {
      throw new AuthenticationError("Username not found.");
    } else if (userInfo.password !== password) {
      throw new AuthenticationError("Invalid credentials.");
    } else if (userInfo?.isDeleted) {
      throw new AuthenticationError(
        "Your account is deleted. Please contact super admin."
      );
    }

    const user = { userId: userInfo.id, role: userInfo.role };
    // Generate token
    const token = jwt.sign(user, process.env.JWT_KEY, {
      expiresIn: "24h",
    });

    res.json({ token, user });
  } catch (error) {
    return next(error);
  }
};

export const noResponse = async (req, res, next) => {
  try {
    res.status(200).end(); // Sends a 200 status with no body
  } catch (error) {
    return next(error);
  }
};
