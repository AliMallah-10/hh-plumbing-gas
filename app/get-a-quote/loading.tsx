import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header skeleton */}
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-128 mx-auto" />
          </div>

          {/* Form skeleton */}
          <Card className="shadow-xl">
            <CardHeader>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Service type skeleton */}
              <div>
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </div>

              {/* Form fields skeleton */}
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>

              {/* Additional details skeleton */}
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-24 w-full" />
              </div>

              {/* Submit button skeleton */}
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
