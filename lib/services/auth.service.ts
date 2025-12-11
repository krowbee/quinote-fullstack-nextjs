import { prisma } from "../prisma/prisma";
import * as bcrypt from "bcrypt";
import { tokenService } from "./token.service";
import crypto, { UUID } from "crypto";
import { saltOrRounds } from "./crypto.service";
import { sessionService } from "./session.service";
import {
  BadRequestException,
  InternalException,
  UnauthorizedException,
} from "../exceptions/httpExceptions/httpExceptions";

class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: { id: number; email: string };
  }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      throw new UnauthorizedException("Invalid credentials");
    const jti = await AuthService.generateJti();
    const payload = { jti, id: user.id, email: user.email };

    const { accessToken, refreshToken } =
      tokenService.generateAccessAndRefreshTokens(payload);

    const session = await sessionService.createUserSession(
      jti,
      refreshToken,
      user.id
    );
    if (!session) throw new InternalException();

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
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException("User is already exists");

    const passwordHash = await bcrypt.hash(password, saltOrRounds);

    const newUser = await prisma.user.create({
      data: { email, password: passwordHash },
    });

    const jti = await AuthService.generateJti();

    const payload = { jti, id: newUser.id, email: newUser.email };

    const { accessToken, refreshToken } =
      tokenService.generateAccessAndRefreshTokens(payload);

    const session = await sessionService.createUserSession(
      jti,
      refreshToken,
      newUser.id
    );
    if (!session) throw new InternalException();

    return {
      accessToken,
      refreshToken,
      user: { id: newUser.id, email: newUser.email },
    };
  }

  async refresh(
    token: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const oldPayload = tokenService.verifyRefreshToken(token);

    if (!oldPayload) throw new UnauthorizedException("Invalid refresh token");

    const oldJti = oldPayload.jti;
    const newJti = AuthService.generateJti();
    const newPayload = {
      id: oldPayload.id,
      email: oldPayload.email,
      jti: newJti,
    };

    const { accessToken, refreshToken } =
      tokenService.generateAccessAndRefreshTokens(newPayload);

    const session = await sessionService.updateUserSession(
      oldJti,
      newJti,
      refreshToken
    );
    if (!session) throw new InternalException("Internal error");

    return { accessToken, refreshToken };
  }

  static generateJti(): UUID {
    return crypto.randomUUID();
  }
}

export const authService = new AuthService();
