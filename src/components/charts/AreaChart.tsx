import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { cn } from '@/lib/utils';
import type { ChartDataPoint } from '@/lib/api';

interface AreaChartProps {
  data: ChartDataPoint[];
  className?: string;
  height?: number;
}

export function AreaChart({ data, className, height = 280 }: AreaChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('flex items-center justify-center h-[280px]', className)}>
        <p className="text-body-sm text-neutral-400">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-neutral-200 rounded-lg shadow-dropdown p-3 min-w-[160px]">
          <p className="text-caption text-neutral-500">{label}</p>
          <p className="text-metric-value text-neutral-900">{payload[0].value?.toLocaleString()}</p>
          <p className="text-body-xs text-neutral-500 mt-1">Detections</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={cn('w-full', className)} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4984d2" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4984d2" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#dde5ed"
            vertical={false}
            horizontal={true}
          />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#67788b', fontWeight: 400 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#67788b', fontWeight: 400 }}
            tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}
            dx={-10}
            tickCount={4}
            domain={[0, maxValue * 1.1]}
          />
          <Tooltip
            content={customTooltip}
            wrapperStyle={{ pointerEvents: 'none' }}
            contentStyle={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none', padding: 0 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#4984d2"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#areaGradient)"
            connectNulls={true}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}