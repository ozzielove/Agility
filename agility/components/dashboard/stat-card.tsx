import { Card } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, LucideIcon } from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  format?: 'currency' | 'number' | 'percentage' | 'none';
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  format = 'none',
  className
}: StatCardProps) {
  const formattedValue = () => {
    if (typeof value === 'string') return value;

    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'number':
        return formatNumber(value);
      case 'percentage':
        return `${value}%`;
      default:
        return value;
    }
  };

  return (
    <Card className={cn("p-6 hover:shadow-lg transition-all duration-200", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-agility-text-muted">{title}</p>
          <p className="text-3xl font-bold text-agility-text mt-2">
            {formattedValue()}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.isPositive ? (
                <ArrowUpIcon className="h-4 w-4 text-agility-success" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-agility-error" />
              )}
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-agility-success" : "text-agility-error"
                )}
              >
                {trend.value}%
              </span>
              <span className="text-sm text-agility-text-muted">{trend.label}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="rounded-full bg-gradient-to-br from-agility-mid to-agility-light p-3">
            <Icon className="h-6 w-6 text-agility-text" />
          </div>
        )}
      </div>
    </Card>
  );
}
