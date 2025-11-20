"use client";

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { formatCurrency } from '@/lib/utils/format';

interface AreaChartProps {
  data: Array<{ name: string; value: number; }>;
  color?: string;
  height?: number;
  showGrid?: boolean;
  gradientId?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-agility-border bg-agility-surface p-3 shadow-lg">
        <p className="text-sm font-medium text-agility-text">{label}</p>
        <p className="text-lg font-bold text-agility-primary">
          {formatCurrency(payload[0].value as number)}
        </p>
      </div>
    );
  }
  return null;
}

export function AreaChart({
  data,
  color = 'agility-primary',
  height = 300,
  showGrid = true,
  gradientId = 'areaGradient'
}: AreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--agility-mid)" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="var(--agility-light)" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--agility-border)"
            vertical={false}
          />
        )}
        <XAxis
          dataKey="name"
          stroke="var(--agility-text-muted)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="var(--agility-text-muted)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="var(--agility-primary)"
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
