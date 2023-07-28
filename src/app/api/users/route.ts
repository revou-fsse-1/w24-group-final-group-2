import { prisma } from "@/libs/db";

export async function GET() {
  const user = await prisma.user.findMany();
  console.log(user);
  return new Response(JSON.stringify(user));
}
