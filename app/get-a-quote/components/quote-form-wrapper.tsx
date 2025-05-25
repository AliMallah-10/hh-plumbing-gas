"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import QuoteForm from "./quote-form"

function QuoteFormContent() {
  const searchParams = useSearchParams()
  const serviceFromUrl = searchParams.get("service")

  return <QuoteForm initialService={serviceFromUrl} />
}

export default function QuoteFormWrapper() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <QuoteFormContent />
    </Suspense>
  )
}
