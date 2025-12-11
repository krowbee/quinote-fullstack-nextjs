import { UUID } from "crypto";

export type UserType = { id: number; email: string };

export type PayloadType = { id: number; jti: UUID; email: string };
