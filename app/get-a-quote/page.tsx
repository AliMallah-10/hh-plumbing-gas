import { Suspense } from "react"
import QuoteFormWrapper from "./components/quote-form-wrapper"

export default function GetQuotePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuoteFormWrapper />
    </Suspense>
  )
}
