import { UserRoles } from '@prisma/client';
import { jwtVerify } from 'jose'
import { NextRequest } from "next/server";

export async function getUserRole(authToken: string) {
  if (authToken) {
    const decodedAuthToken = await jwtVerify(authToken, new TextEncoder().encode(process.env.TOKEN_SECRET_KEY!))
    const payload = decodedAuthToken.payload
    return payload.role
  } else {
    return null
  }
}