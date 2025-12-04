import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
   req: NextRequest,
   { params }: { params: Promise<{ taskId: string }> }
 ) {
   try {
      const { taskId } = await params;
      const body = await req.json();
   
      const task = await prisma.task.upsert({
         where: { id: Number(taskId) },
         update: body,
         create: { id: Number(taskId), ...body },
      });
   
      return NextResponse.json(
         { task, message: "Task updated successfully" },
         { status: 200 }
      );
   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}

export async function PATCH(
   req: NextRequest,
   { params }: { params: Promise<{ taskId: string }> }
) {
   try {
      const { taskId } = await params;
      const body = await req.json();
   
      const task = await prisma.task.update({
         where: { id: Number(taskId) },
         data: body,
      });
   
      return NextResponse.json(
         { task, message: "Task updated successfully" },
         { status: 200 }
      );
   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}

export async function DELETE(
   req: Request,
   { params }: { params: Promise<{ taskId: string }> }
) {
   try {
      const { taskId } = await params;
   
      if (!taskId) {
         return NextResponse.json(
            { message: "Task ID is required" },
            { status: 400 }
         );
      }
   
      const task = await prisma.task.delete({
         where: { id: Number(taskId) }, // convert to number if your ID is Int
      });
   
      return NextResponse.json(
         { message: "Task deleted successfully.", task },
         { status: 200 }
      );
   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}