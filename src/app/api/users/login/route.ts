import { prisma } from "@/lib/db/prisma"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    // Checking if the user exists
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      console.log(`User doesn't exist`)
      return NextResponse.json({ error: `User doesn't exist` }, { status: 400 })
    }

    // check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
      console.log(`Invalid password`)
      return NextResponse.json({ error: `Invalid password` }, { status: 400 })
    }

    // create token
    const tokenData = {
      id: user.id,
      email: user.email
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: "1d" })
    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
    })
    response.cookies.set("authToken", token, {
      httpOnly: true,
    })
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}