import { prisma } from "@/libs/db";

export async function GET() {
  const user = await prisma.user.findMany();
  return new Response(JSON.stringify(user));
}
