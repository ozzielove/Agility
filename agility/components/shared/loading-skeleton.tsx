import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  variant?: 'card' | 'table' | 'stat' | 'chart';
  count?: number;
  className?: string;
}

export function LoadingSkeleton({
  variant = 'card',
  count = 1,
  className
}: LoadingSkeletonProps) {
  if (variant === 'stat') {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className={cn("p-6", className)}>
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-28" />
              </div>
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </Card>
        ))}
      </>
    );
  }

  if (variant === 'table') {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center gap-4 pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-24" />
          ))}
        </div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b border-agility-border">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-32 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <Card className={cn("p-6", className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </Card>
    );
  }

  // Default: card variant
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className={cn("p-6", className)}>
          <div className="space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </Card>
      ))}
    </>
  );
}
