"use client";

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, Cell } from 'recharts';
import { formatCurrency } from '@/lib/utils/format';

interface BarChartProps {
  data: Array<{ name: string; value: number; color?: string; }>;
  height?: number;
  showGrid?: boolean;
  layout?: 'horizontal' | 'vertical';
}

const COLORS = [
  'var(--agility-primary)',
  'var(--agility-light)',
  'var(--agility-mid)',
  'var(--agility-success)',
  'var(--agility-warning)',
  'var(--agility-info)',
];

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

export function BarChart({
  data,
  height = 300,
  showGrid = true,
  layout = 'vertical'
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        layout={layout}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--agility-border)"
            horizontal={layout === 'horizontal'}
            vertical={layout === 'vertical'}
          />
        )}
        {layout === 'vertical' ? (
          <>
            <XAxis
              type="number"
              stroke="var(--agility-text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              dataKey="name"
              type="category"
              stroke="var(--agility-text-muted)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={100}
            />
          </>
        ) : (
          <>
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
          </>
        )}
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="value"
          radius={layout === 'vertical' ? [0, 8, 8, 0] : [8, 8, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || COLORS[index % COLORS.length]}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
