"use client"

import { useState, useEffect } from "react"
import type { Session } from "@supabase/supabase-js"
import { supabase } from "@/app/lib/supabase"

const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setIsLoading(false)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setIsLoading(false)
    })
  }, [])

  return { session, isLoading }
}

export default useAuth
