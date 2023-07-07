import { PrismaClient } from '@prisma/client'

export type User = {
    name: string,
    last_name: string,
    password: string,
    email: string,
    age: number
}

export type Decoded = {
    id: String
    email: String,
    name: String,
    iat: number,
    exp: number
}

export interface RequestBody {
    startDate: string;
    endDate: string;
  }

export const prisma = new PrismaClient()