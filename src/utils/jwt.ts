import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

const ALGORITHM = "HS256" as const;

export const signToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    algorithm: ALGORITHM,
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET, {
    algorithms: [ALGORITHM],
  });

  if (typeof decoded === "string" || typeof decoded.sub !== "string") {
    throw new Error("Token com payload inválido");
  }

  return { sub: decoded.sub };
};
