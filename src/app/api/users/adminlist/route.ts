import { prisma } from "@/lib/db/prisma";
import { UserRoles } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let users = await prisma.users.findMany({
      where: {
        role: UserRoles.ADMIN
      }
    })

    if (!users) {
      users = []
    }

    return NextResponse.json({
      message: 'Admin list has been fetched',
      success: true,
      users
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}