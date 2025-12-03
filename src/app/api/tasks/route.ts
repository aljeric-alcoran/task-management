import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
   try {
      const tasks = await prisma.tasks.findMany({
         orderBy: [
            { completed: "asc" },
            { created_at: "desc" },
         ],
      });
 
      return NextResponse.json({ tasks }, { status: 200 });
   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}

export async function POST(req: NextRequest) {
   try {
      const payload = await req.json();
   
      const task = await prisma.tasks.create({
         data: payload,
      });
   
      return NextResponse.json({ task }, { status: 201 });
   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}