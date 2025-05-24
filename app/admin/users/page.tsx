import { supabase } from "@/app/lib/supabase"

async function getUsers() {
  const { data: users, error } = await supabase.from("users").select("*")

  if (error) {
    console.error("Error fetching users:", error)
    return []
  }

  return users || []
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.id}
          </li>
        ))}
      </ul>
    </div>
  )
}
