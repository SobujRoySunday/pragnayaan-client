import { prisma } from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let types = await prisma.busTypes.findMany()

    console.log(types)
    if (!types) {
      types = []
    }

    return NextResponse.json({
      message: 'Bus type data fetched',
      success: true,
      types
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}