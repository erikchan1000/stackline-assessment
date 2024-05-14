import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import Data from "@/public/stackline_frontend_assessment_data_2021.json"

interface Context {
  params: undefined;
}

export async function POST(request: NextRequest, context: Context) {
  const body: { amount: number } = await request.json();
  const { amount = 1 } = body;

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ data: amount });
}

export async function GET(request: NextRequest, context: Context) {
  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({ data: Data });
}