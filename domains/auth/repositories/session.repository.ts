import { Session } from "@prisma/client";
import { prisma } from "../../../lib/prisma/prisma";

class SessionRepo {
  async createSession(data: {
    userId: number;
    jti: string;
    expireAt: Date;
    tokenHash: string;
  }): Promise<Session> {
    return await prisma.session.create({
      data: {
        ownerId: data.userId,
        jti: data.jti,
        expireAt: data.expireAt,
        tokenHash: data.tokenHash,
      },
    });
  }

  async updateSession(data: {
    oldJti: string;
    newJti: string;
    tokenHash: string;
    expireAt: Date;
  }): Promise<Session> {
    const updatedSession = await prisma.session.update({
      where: { jti: data.oldJti },
      data: {
        expireAt: data.expireAt,
        tokenHash: data.tokenHash,
        jti: data.newJti,
      },
    });
    return updatedSession;
  }
}

export const sessionRepo = new SessionRepo();
