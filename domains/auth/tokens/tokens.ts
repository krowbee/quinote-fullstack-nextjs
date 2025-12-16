import * as jwt from "jsonwebtoken";
import { TokenPayloadType } from "./tokens.types";
import { InvalidTokenError } from "./token.errors";

const accessTokenOptions: jwt.SignOptions = {
  expiresIn: "15m",
};

const refreshTokenOptions: jwt.SignOptions = {
  expiresIn: "7d",
};

class Tokens {
  generateAccessAndRefreshTokens(payload: TokenPayloadType) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: TokenPayloadType) {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_SECRET!,
      accessTokenOptions
    );
    return accessToken;
  }

  generateRefreshToken(payload: TokenPayloadType) {
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_SECRET!,
      refreshTokenOptions
    );
    return refreshToken;
  }

  verifyAccessToken(token: string): TokenPayloadType {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_SECRET!);
      return payload as TokenPayloadType;
    } catch {
      throw new InvalidTokenError();
    }
  }

  verifyRefreshToken(token: string): TokenPayloadType {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_SECRET!);
      return payload as TokenPayloadType;
    } catch {
      throw new InvalidTokenError();
    }
  }
}

export const tokens = new Tokens();
