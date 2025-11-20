import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}>
      {Icon && (
        <div className="rounded-full bg-agility-surface p-6 mb-4">
          <Icon className="h-12 w-12 text-agility-text-muted" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-agility-text mb-2">{title}</h3>
      {description && (
        <p className="text-agility-text-muted max-w-md mb-6">{description}</p>
      )}
      {action && (
        <Button
          onClick={action.onClick}
          className="bg-gradient-to-r from-agility-mid to-agility-light hover:brightness-110"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
