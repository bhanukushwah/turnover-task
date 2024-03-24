import jwt, { type Secret } from "jsonwebtoken";

const secret: Secret = process.env.JWT_SECRET ?? "secret";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, secret, { expiresIn: "30d" });
};

export const validateToken = (token: string) => {
  return jwt.decode(token);
};
