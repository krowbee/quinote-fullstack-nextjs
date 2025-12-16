import { tokens } from "../tokens/tokens";
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from "../errors/auth.errors";
import { comparePassword, generateJti, hashValue } from "@/lib/crypto/crypto";
import { userRepo } from "../repositories/user.repository";
import { sessionService } from "./session.service";
import { UserType } from "../types/user.type";

class AuthService {
  private async issueTokens(user: UserType) {
    const jti = generateJti();

    const payload = { jti, id: user.id, email: user.email };

    const { accessToken, refreshToken } =
      tokens.generateAccessAndRefreshTokens(payload);

    await sessionService.createUserSession(jti, refreshToken, user.id);

    return { accessToken, refreshToken };
  }

  async login(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: { id: number; email: string };
  }> {
    const user = await userRepo.findUserByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const isCorrectPassword = await comparePassword(password, user.password);

    if (!isCorrectPassword) throw new InvalidCredentialsError();

    const { accessToken, refreshToken } = await this.issueTokens(user);

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email },
    };
  }

  async register(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: { id: number; email: string };
  }> {
    const existing = await userRepo.findUserByEmail(email);
    if (existing) throw new UserAlreadyExistsError();

    const passwordHash = await hashValue(password);

    const newUser = await userRepo.createUser({
      email,
      password: passwordHash,
    });

    const { accessToken, refreshToken } = await this.issueTokens(newUser);

    return {
      accessToken,
      refreshToken,
      user: { id: newUser.id, email: newUser.email },
    };
  }

  async refresh(
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const oldPayload = tokens.verifyRefreshToken(token);

    const oldJti = oldPayload.jti;
    const newJti = generateJti();
    const newPayload = {
      id: oldPayload.id,
      email: oldPayload.email,
      jti: newJti,
    };

    const { accessToken, refreshToken } =
      tokens.generateAccessAndRefreshTokens(newPayload);

    await sessionService.updateUserSession(oldJti, newJti, refreshToken);

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
