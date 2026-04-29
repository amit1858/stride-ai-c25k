import { prisma } from "@/lib/db";
export async function getDemoUser() {
  return prisma.user.upsert({ where: { email: "demo@strideai.app" }, update: {}, create: { email: "demo@strideai.app", name: "Demo Runner" } });
}
