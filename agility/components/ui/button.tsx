import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agility-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            // Variant styles
            "bg-gradient-to-br from-agility-dark via-agility-mid to-agility-light text-agility-text hover:brightness-110 active:scale-95":
              variant === "primary",
            "bg-agility-primary text-agility-text hover:bg-agility-mid active:scale-95":
              variant === "default",
            "bg-agility-surface text-agility-text hover:bg-agility-surface-hover border border-agility-border":
              variant === "secondary",
            "hover:bg-agility-surface hover:text-agility-text":
              variant === "ghost",
            "bg-agility-error text-white hover:bg-agility-error/90":
              variant === "destructive",
            // Size styles
            "h-10 px-6 py-2": size === "default",
            "h-9 px-4 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10 p-0": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
