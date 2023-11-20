import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { token, password, rePassword } = reqBody

    // checking if the token is valid
    const user = await prisma.users.findFirst({
      where: {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { gt: Date.now() }
      }
    })
    if (!user) {
      return NextResponse.json('Invalid token', { status: 400 })
    }

    // checking if fields are not empty
    if (password.length === 0) {
      return NextResponse.json('Password cannot be empty', { status: 400 })
    }
    if (rePassword.length === 0) {
      return NextResponse.json('Please retype your password', { status: 400 })
    }

    // checking password requirements
    if (password.length < 8) {
      return NextResponse.json('Minimum length of password should be 8', { status: 400 })
    }
    if (password !== rePassword) {
      return NextResponse.json('Passwords are not matching', { status: 400 })
    }

    // Hashing the password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        password: hashedPassword,
        forgotPasswordToken: "",
        forgotPasswordTokenExpiry: 0
      }
    })

    return NextResponse.json({
      message: 'Password reset successfully',
      success: true
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}