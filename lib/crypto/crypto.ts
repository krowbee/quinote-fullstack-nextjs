import * as bcrypt from "bcrypt";
import { saltOrRounds } from "./crypto.constants";
import { UUID } from "crypto";
import crypto from "crypto";

export async function hashValue(value: string): Promise<string> {
  const hash = await bcrypt.hash(value, saltOrRounds);
  return hash;
}

export async function comparePassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, passwordHash);
  return isValid;
}

export function generateJti(): UUID {
  return crypto.randomUUID();
}
