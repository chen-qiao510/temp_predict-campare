import React from 'react';
import { METRICS } from '../constants';

interface MetricsTableProps {
  conditionId: number;
}

const MetricsTable: React.FC<MetricsTableProps> = ({ conditionId }) => {
  const data = METRICS[conditionId];

  if (!data) {
    return (
      <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded text-center text-gray-500">
        该工况暂无评价指标数据
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-hidden bg-white shadow sm:rounded-lg border border-gray-200">
      <div className="px-4 py-3 bg-slate-50 border-b border-gray-200">
        <h3 className="text-sm font-medium leading-6 text-gray-700">工况 {conditionId} 评价指标</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">最大温度差</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.maxDiff} ℃</dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">平均相对百分比误差 (MAPE)</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.mape}%</dd>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">R² (决定系数)</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.r2}</dd>
          </div>
          <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">RMSE (均方根误差)</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{data.rmse} ℃</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default MetricsTable;