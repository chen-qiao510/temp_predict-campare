import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getChartData } from '../utils/dataProcessor';
import MetricsTable from './MetricsTable';
import { CONDITION_DESCRIPTIONS } from '../constants';

interface ConditionPanelProps {
  conditionId: number;
  onConditionChange: (id: number) => void;
  title?: string;
}

const ConditionPanel: React.FC<ConditionPanelProps> = ({ conditionId, onConditionChange, title }) => {
  const chartData = useMemo(() => getChartData(conditionId), [conditionId]);
  const hasData = chartData.length > 0;
  const description = CONDITION_DESCRIPTIONS[conditionId];

  // ✅ 关键新增：根据数据量自动“稀疏显示红色点”
  // 目标：点最多 ~60 个；数据少就每个点都显示
  const dotStep = useMemo(() => {
    const n = chartData.length;
    if (n <= 120) return 1;        // 数据不多：每个点都画
    return Math.ceil(n / 60);      // 数据很多：大约每 (n/60) 个画一个点
  }, [chartData.length]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full border border-gray-100">
      {/* Header / Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <div className="flex items-center">
          <label className="block text-sm font-medium text-slate-700 whitespace-nowrap">
            {title || '选择工况'}:
          </label>
          <select
            value={conditionId}
            onChange={(e) => onConditionChange(Number(e.target.value))}
            className="ml-3 block w-32 rounded-md border-gray-300 py-1.5 pl-3 pr-8 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm bg-slate-50 border"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
              <option key={id} value={id}>
                工况 {id}
              </option>
            ))}
          </select>
        </div>
        
        {description && (
          <div className="flex-1 sm:ml-4 flex items-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              {description}
            </span>
          </div>
        )}
      </div>

      {/* Chart Area - Fixed Height to ensure rendering */}
      <div className="w-full h-[500px] relative mb-6">
        {!hasData ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded border border-dashed border-gray-300 text-gray-500">
             <div className="text-center">
                <p className="text-lg font-semibold">暂无数据</p>
                <p className="text-sm mt-1">请确保相关数据文件已加载</p>
             </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 10,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis 
                dataKey="time" 
                type="number" 
                domain={['dataMin', 'dataMax']} 
                tickCount={10}
                label={{ value: '时间 (s)', position: 'insideBottom', offset: -10, fill: '#64748b' }}
                stroke="#cbd5e1"
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                label={{ value: '温度 (℃)', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b' }}
                stroke="#cbd5e1"
                tick={{ fill: '#64748b', fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [value.toFixed(2) + ' ℃']}
                labelFormatter={(label: number) => `时间: ${label} s`}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ paddingBottom: '10px' }}/>
              <Line
                name="预测模型"
                type="monotone"
                dataKey="predict"
                stroke="#ef4444" // Red
                strokeWidth={2}
                // ✅ 关键修改：只抽样显示点
                dot={(props: any) => {
                  const { cx, cy, index } = props;
                  if (cx == null || cy == null || index == null) return null;
                  if (index % dotStep !== 0) return null;
                  return <circle cx={cx} cy={cy} r={3} fill="#ef4444" />;
                }}
                activeDot={{ r: 6 }}
                connectNulls
              />
              <Line
                name="台架试验"
                type="monotone"
                dataKey="experiment"
                stroke="#3b82f6" // Blue
                strokeWidth={2}
                dot={false} // Dense data: No dots
                activeDot={{ r: 6 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Metrics Table */}
      <MetricsTable conditionId={conditionId} />
    </div>
  );
};

export default ConditionPanel;