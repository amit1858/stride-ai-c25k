import { NextResponse } from "next/server";
import { onboardingInputSchema } from "@/lib/ai/schemas";
export async function POST(request: Request){onboardingInputSchema.parse(await request.json());return NextResponse.json({ok:true,demoMode:true});}
