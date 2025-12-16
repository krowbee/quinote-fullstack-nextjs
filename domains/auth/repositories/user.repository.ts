import { prisma } from "@/lib/prisma/prisma";
import { User } from "@prisma/client";

class UserRepo {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: { email: string; password: string }): Promise<User> {
    return prisma.user.create({
      data: { email: data.email, password: data.password },
    });
  }
}

export const userRepo = new UserRepo();
