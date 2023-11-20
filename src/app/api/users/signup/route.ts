import { EmailTypes } from "@/constants"
import { prisma } from "@/lib/db/prisma"
import { sendEmail } from "@/utils/mailer"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { name, email, password, rePassword, role } = reqBody

    // Check if fields are not empty
    if (name.length === 0) {
      return NextResponse.json(`Name can't be empty`, { status: 400 })
    }
    if (email.length === 0) {
      return NextResponse.json(`Email can't be empty`, { status: 400 })
    }
    if (password.length === 0) {
      return NextResponse.json(`Password can't be empty`, { status: 400 })
    }
    if (rePassword.length === 0) {
      return NextResponse.json(`Please retype your password`, { status: 400 })
    }

    // Checking if the user already exist
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })
    if (user) {
      return NextResponse.json('User already exist with that email', { status: 400 })
    }

    // Checking password requirements
    if (password?.length < 8) {
      return NextResponse.json(`Minimum 8 characters needed for the password`, { status: 400 })
    }
    if (password !== rePassword) {
      return NextResponse.json(`Passwords didn't match`, { status: 400 })
    }

    // Hashing the password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // Add the user to database
    const createdUser = await prisma.users.create({
      data: { email, name, password: hashedPassword, role }
    })

    if (createdUser) {
      // send verification email
      await sendEmail({ email, emailType: EmailTypes.VERIFY, userId: createdUser.id })

      return NextResponse.json({
        message: "User created successfully",
        success: true,
        createdUser
      })
    } else {
      return NextResponse.json({ error: `Couldn't sign up` }, { status: 500 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}