import { Session } from "@prisma/client";
import { prisma } from "../prisma/prisma";
import { UUID } from "crypto";
import { saltOrRounds } from "./crypto.service";
import * as bcrypt from "bcrypt";
class SessionService {
  async calcExpireAt(): Promise<Date> {
    const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return expireAt;
  }
  async createUserSession(
    jti: UUID,
    token: string,
    userId: number
  ): Promise<Session> {
    const expireAt = await this.calcExpireAt();
    const tokenHash = await bcrypt.hash(token, saltOrRounds);
    const session = await prisma.session.create({
      data: { ownerId: userId, jti, expireAt: expireAt, tokenHash },
    });

    return session;
  }

  async updateUserSession(
    oldJti: UUID,
    newJti: UUID,
    token: string
  ): Promise<Session> {
    const expireAt = await this.calcExpireAt();
    const tokenHash = await bcrypt.hash(token, saltOrRounds);
    const updatedSession = await prisma.session.update({
      where: { jti: oldJti },
      data: { expireAt, tokenHash, jti: newJti },
    });
    return updatedSession;
  }
}

export const sessionService = new SessionService();
