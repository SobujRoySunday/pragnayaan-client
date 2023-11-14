import { prisma } from "@/lib/db/prisma"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { name, email, password, rePassword, role } = reqBody

    // Checking if the user already exist
    const user = await prisma.users.findUnique({
      where: {
        email
      }
    })
    if (user) {
      console.log('User already exist with that email')
      return NextResponse.json({ error: 'User already exist with that email' }, { status: 400 })
    }

    // Checking for correct password length
    if (password?.length < 8) {
      console.log(`Minimum 8 characters needed for the password`)
      return NextResponse.json({ error: `Minimum 8 characters needed for the password` }, { status: 400 })
    }

    // Cross checking with the retyped password
    if (password !== rePassword) {
      console.log(`Passwords didn't match`)
      return NextResponse.json({ error: `Passwords didn't match` }, { status: 400 })
    }

    // Hashing the password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    // Add the user to database
    const createdUser = await prisma.users.create({
      data: { email, name, password: hashedPassword, role }
    })

    if (createdUser) {
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