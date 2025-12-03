import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const query = searchParams.get("query");
   
   try {
      if (!query) {
         const tasks = await prisma.tasks.findMany({
            orderBy: [
               { completed: "asc" },
               { created_at: "desc" },
            ],
         });

         return NextResponse.json(tasks, { status: 200 });
         
      } else {

         const tasks = await prisma.tasks.findMany({
            where: {
            OR: [
               { task_title: { contains: query } },
               { description: { contains: query } },
               { priority: { contains: query } },
            ],
            },
            orderBy: [
               { completed: "asc" },
               { created_at: "desc" },
            ],
            take: 50,
         });

         return NextResponse.json(tasks, { status: 200 });
      }


   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}