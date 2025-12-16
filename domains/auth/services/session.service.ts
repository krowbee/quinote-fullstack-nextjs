import { Session } from "@prisma/client";
import { SESSION_TTL_MS } from "../constants/session.constants";
import { hashValue } from "@/lib/crypto/crypto";
import { sessionRepo } from "../repositories/session.repository";

class SessionService {
  private calcExpireAt(): Date {
    const expireAt = new Date(Date.now() + SESSION_TTL_MS);
    return expireAt;
  }

  async createUserSession(
    jti: string,
    token: string,
    userId: number
  ): Promise<Session> {
    const expireAt = this.calcExpireAt();
    const tokenHash = await hashValue(token);
    const session = await sessionRepo.createSession({
      userId,
      jti,
      expireAt: expireAt,
      tokenHash,
    });

    return session;
  }

  async updateUserSession(
    oldJti: string,
    newJti: string,
    token: string
  ): Promise<Session> {
    const expireAt = this.calcExpireAt();
    const tokenHash = await hashValue(token);
    const updatedSession = await sessionRepo.updateSession({
      oldJti,
      expireAt,
      tokenHash,
      newJti,
    });
    return updatedSession;
  }
}

export const sessionService = new SessionService();
