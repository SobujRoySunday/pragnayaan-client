import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    })
    response.cookies.set('authToken', '', { expires: Date.now() })
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}