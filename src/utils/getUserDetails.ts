import { jwtVerify } from 'jose'

export async function getUserDetails(authToken: string) {
  if (authToken) {
    const decodedAuthToken = await jwtVerify(authToken, new TextEncoder().encode(process.env.TOKEN_SECRET_KEY!))
    const payload = decodedAuthToken.payload
    return payload
  } else {
    return null
  }
}