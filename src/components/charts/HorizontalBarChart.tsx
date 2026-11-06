import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { cn } from '@/lib/utils';
import type { BarChartData } from '@/lib/api';

interface HorizontalBarChartProps {
  data: BarChartData[];
  className?: string;
  height?: number;
}

export function HorizontalBarChart({ data, className, height = 280 }: HorizontalBarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('flex items-center justify-center h-[280px]', className)}>
        <p className="text-body-sm text-neutral-400">No data available</p>
      </div>
    );
  }

  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white border border-neutral-200 rounded-lg shadow-dropdown p-3 min-w-[180px]">
          <p className="text-body-sm font-medium text-neutral-900">{item.category}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-metric-value text-neutral-900">{item.count?.toLocaleString()}</span>
            <span className="text-body-sm text-neutral-500">({item.percentage}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          barGap={0.3}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#dde5ed"
            vertical={true}
            horizontal={false}
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#67788b', fontWeight: 400 }}
            tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}
            interval="preserveStartEnd"
          />
          <YAxis
            type="category"
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#67788b', fontWeight: 400 }}
            width={140}
            dx={-10}
          />
          <Tooltip
            content={customTooltip}
            wrapperStyle={{ pointerEvents: 'none' }}
            contentStyle={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}
          />
          <Bar
            dataKey="count"
            radius={[0, 3, 3, 0]}
            maxBarSize={32}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}