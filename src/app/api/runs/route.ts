import { NextResponse } from "next/server";import { runLogSchema } from "@/lib/ai/schemas";import { adaptAfterRun } from "@/lib/training/adapt";
export async function POST(request: Request){const body=runLogSchema.parse(await request.json());const adaptation=adaptAfterRun(body);return NextResponse.json({log:body,adaptation,demoMode:true});}
