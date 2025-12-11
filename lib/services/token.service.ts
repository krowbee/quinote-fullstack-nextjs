import * as jwt from "jsonwebtoken";
import { PayloadType } from "../types/user.type";
import { UnauthorizedException } from "../exceptions/httpExceptions/httpExceptions";

const accessTokenOptions: jwt.SignOptions = {
  expiresIn: "15m",
};

const refreshTokenOptions: jwt.SignOptions = {
  expiresIn: "7d",
};

class TokenService {
  generateAccessAndRefreshTokens(payload: PayloadType) {
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  generateAccessToken(payload: PayloadType) {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_SECRET!,
      accessTokenOptions
    );
    return accessToken;
  }

  generateRefreshToken(payload: PayloadType) {
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_SECRET!,
      refreshTokenOptions
    );
    return refreshToken;
  }

  verifyAccessToken(token: string): PayloadType {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_SECRET!);
      return payload as PayloadType;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }

  verifyRefreshToken(token: string): PayloadType {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_SECRET!);
      return payload as PayloadType;
    } catch {
      throw new UnauthorizedException("Invalid or expired token");
    }
  }
}

export const tokenService = new TokenService();
