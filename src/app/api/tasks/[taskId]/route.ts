import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function DELETE(req: Request, { params }: { params: Promise<{ taskId: string }> }) {
   try {
      const { taskId } = await params;
      if (!taskId) {
         return NextResponse.json({ message: "Task ID is required" }, { status: 400 });
      }

      const { data, error } = await supabase
         .from("tasks")
         .delete()
         .eq("id", taskId);

      if (error) {
         console.error("Supabase delete error:", error);
         return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ message: "Task deleted successfully.", task: data }, { status: 200 });
   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}