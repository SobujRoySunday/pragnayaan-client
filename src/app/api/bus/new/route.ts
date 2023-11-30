import { prisma } from "@/lib/db/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { typeName } = reqBody

    // Check if fields are not empty
    if (typeName.length === 0) {
      return NextResponse.json(`Name can't be empty`, { status: 400 })
    }

    // Checking if the type already exist
    const type = await prisma.busTypes.findUnique({
      where: {
        typeName
      }
    })
    if (type) {
      return NextResponse.json('Type already exists', { status: 400 })
    }

    // Add the user to database
    const createdType = await prisma.busTypes.create({
      data: { typeName }
    })

    if (createdType) {
      return NextResponse.json({
        message: "Type created successfully",
        success: true,
        createdType
      })
    } else {
      return NextResponse.json({ error: `Couldn't create a new bus type` }, { status: 500 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}