import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('Invoked')
  try {
    const reqBody = await request.json()
    const { busNumber, busType } = reqBody

    if (!busNumber) {
      return NextResponse.json(`Bus number can't be empty`, { status: 400 })
    }

    const checkBus = await prisma.buses.findUnique({
      where: { busNumber: busNumber }
    })
    if (checkBus) {
      return NextResponse.json(`Already have that bus`, { status: 400 })
    }

    const addedBus = await prisma.buses.create({
      data: {
        busNumber,
        busTypesId: busType
      }
    })

    return NextResponse.json({
      message: 'Bus added to the list',
      success: true,
      addedBus
    })

  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 })
  }
}