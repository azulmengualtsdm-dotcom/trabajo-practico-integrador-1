import { jsonwebtoken } from "jsonwebtoken";
import { configDotenv } from "dotenv";

export const generateToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
  try {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

