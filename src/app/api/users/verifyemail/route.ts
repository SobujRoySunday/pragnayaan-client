import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { token } = reqBody
    console.log(token)

    const user = await prisma.users.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiry: { gt: Date.now() }
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    console.log(user)

    await prisma.users.update({
      where: {
        id: user.id
      },
      data: {
        isVerified: true,
        verifyToken: "",
        verifyTokenExpiry: 0
      }
    })

    return NextResponse.json({
      message: 'Email verified successfully',
      success: true
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}