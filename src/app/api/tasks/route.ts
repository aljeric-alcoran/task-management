import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
   try {
      const { data, error } = await supabase
         .from("tasks")
         .select("*")
         .order("completed", { ascending: true })
         .order("created_at", { ascending: false });

      if (error) {
         console.error("Supabase error:", error);
         return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({ tasks: data }, { status: 200 });
   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}

export async function POST(req: NextRequest) {
   try {
      const payload = await req.json();
      const { data, error } = await supabase
         .from("tasks")
         .insert([payload])
         .select();
   
      if (error) {
         console.error("Supabase insert error:", error);
         return NextResponse.json({ error: error.message }, { status: 500 });
      }
   
      return NextResponse.json({ task: data[0] }, { status: 201 });
   } catch (error: any) {
      console.error("Server error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
}