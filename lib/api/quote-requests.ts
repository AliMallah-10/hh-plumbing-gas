import { supabase } from "@/app/lib/supabase"

export async function getQuoteRequests() {
  const { data: quote_requests, error } = await supabase.from("quote_requests").select("*")

  if (error) {
    console.error(error)
    return null
  }

  return quote_requests
}

export async function getQuoteRequest(id: string) {
  const { data: quote_request, error } = await supabase.from("quote_requests").select("*").eq("id", id).single()

  if (error) {
    console.error(error)
    return null
  }

  return quote_request
}

export async function createQuoteRequest(
  name: string,
  email: string,
  phone: string,
  description: string,
  files: string[] | null,
) {
  const { data, error } = await supabase
    .from("quote_requests")
    .insert([
      {
        name,
        email,
        phone,
        description,
        files,
      },
    ])
    .select()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function updateQuoteRequest(
  id: string,
  name: string,
  email: string,
  phone: string,
  description: string,
  files: string[] | null,
  status: string,
) {
  const { data, error } = await supabase
    .from("quote_requests")
    .update({
      name,
      email,
      phone,
      description,
      files,
      status,
    })
    .eq("id", id)
    .select()

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function deleteQuoteRequest(id: string) {
  const { error } = await supabase.from("quote_requests").delete().eq("id", id)

  if (error) {
    console.error(error)
    return false
  }

  return true
}
