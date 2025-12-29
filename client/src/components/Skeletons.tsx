import { Skeleton } from "@/components/ui/skeleton";

const FieldSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-10 w-full" />
  </div>
)

export const GridSkeleton = ({ count }: { count: number }) => (
  <div className="grid md:grid-cols-3 gap-4 pt-6">
    {Array.from({ length: count }).map((_, i) => (
      <FieldSkeleton key={i} />
    ))}
  </div>
)
