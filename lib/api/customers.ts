import { supabase } from "@/app/lib/supabase"

export const getCustomers = async () => {
  const { data: customers, error } = await supabase.from("customers").select("*")

  if (error) {
    console.error(error)
    throw error
  }

  return customers
}

export const getCustomerById = async (id: string) => {
  const { data: customer, error } = await supabase.from("customers").select("*").eq("id", id).single()

  if (error) {
    console.error(error)
    throw error
  }

  return customer
}

export const createCustomer = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  zip: string,
) => {
  const { data: customer, error } = await supabase
    .from("customers")
    .insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        address: address,
        city: city,
        state: state,
        zip: zip,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error(error)
    throw error
  }

  return customer
}

export const updateCustomer = async (
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  state: string,
  zip: string,
) => {
  const { data: customer, error } = await supabase
    .from("customers")
    .update({
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      address: address,
      city: city,
      state: state,
      zip: zip,
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error(error)
    throw error
  }

  return customer
}

export const deleteCustomer = async (id: string) => {
  const { error } = await supabase.from("customers").delete().eq("id", id)

  if (error) {
    console.error(error)
    throw error
  }

  return true
}
