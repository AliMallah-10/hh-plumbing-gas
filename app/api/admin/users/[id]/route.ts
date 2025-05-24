import { NextResponse } from "next/server"

import { supabase } from "@/app/lib/supabase"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  const { error } = await supabase.from("users").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return new Response(null, { status: 204 })
}
