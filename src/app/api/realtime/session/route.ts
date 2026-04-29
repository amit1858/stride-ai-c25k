import { NextResponse } from "next/server";
export async function POST(){return NextResponse.json({error:'Not configured in MVP demo mode.'},{status:501});}
