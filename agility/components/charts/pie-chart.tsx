"use client";

import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, TooltipProps, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils/format';

interface PieChartProps {
  data: Array<{ name: string; value: number; color?: string; }>;
  height?: number;
  showLegend?: boolean;
  innerRadius?: number;
}

const COLORS = [
  'var(--agility-primary)',
  'var(--agility-light)',
  'var(--agility-success)',
  'var(--agility-warning)',
  'var(--agility-info)',
  'var(--agility-error)',
];

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-agility-border bg-agility-surface p-3 shadow-lg">
        <p className="text-sm font-medium text-agility-text">{payload[0].name}</p>
        <p className="text-lg font-bold text-agility-primary">
          {formatCurrency(payload[0].value as number)}
        </p>
        <p className="text-xs text-agility-text-muted">
          {((payload[0].value as number / payload[0].payload.total) * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
}

export function PieChart({
  data,
  height = 300,
  showLegend = true,
  innerRadius = 0 // Set to 60-70 for donut chart
}: PieChartProps) {
  // Calculate total for percentage
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {dataWithTotal.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        {showLegend && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
