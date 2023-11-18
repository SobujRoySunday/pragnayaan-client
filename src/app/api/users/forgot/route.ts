import { prisma } from "@/lib/db/prisma";
import { sendEmail } from "@/utils/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const reqBody = await request.json()
  const { email } = reqBody

  const user = await prisma.users.findUnique({ where: { email: email } })
  if (!user) {
    return NextResponse.json('User not found', { status: 400 })
  }

  await sendEmail({ email, emailType: 'RESET', userId: user.id })
  return NextResponse.json({
    message: 'Mail sent',
    success: true
  })
}