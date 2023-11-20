import { EmailTypes } from "@/constants"
import { prisma } from "@/lib/db/prisma"
import { getUserDetails } from "@/utils/getUserDetails"
import { sendEmail } from "@/utils/mailer"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value || ''
  const payload = await getUserDetails(authToken)
  if (!payload) {
    return NextResponse.json('No data found', { status: 400 })
  }
  const user = {
    name: payload.name
  }
  return NextResponse.json({
    message: 'User data received successfully',
    success: true,
    user
  })
}