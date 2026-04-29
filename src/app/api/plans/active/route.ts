import { NextResponse } from "next/server";import { baselineC25KPlan } from "@/lib/training/basePlan";
export async function GET(){return NextResponse.json({plan:baselineC25KPlan,nextWorkout:baselineC25KPlan.workouts[0]});}
