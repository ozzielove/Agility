import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-agility-primary/10 text-agility-primary": variant === "default",
          "bg-agility-success/10 text-agility-success": variant === "success",
          "bg-agility-warning/10 text-agility-warning": variant === "warning",
          "bg-agility-error/10 text-agility-error": variant === "error",
          "bg-agility-info/10 text-agility-info": variant === "info",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
