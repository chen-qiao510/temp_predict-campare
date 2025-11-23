import React, { useState } from 'react';
import ConditionPanel from './components/ConditionPanel';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [leftCondition, setLeftCondition] = useState<number>(1);
  const [rightCondition, setRightCondition] = useState<number>(2);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'single' ? 'dual' : 'single'));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar / Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* Simple Icon */}
            <svg className="h-8 w-8 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
              海泰台架试验与预测模型对比分析
            </h1>
          </div>
          <button
            onClick={toggleViewMode}
            className={`
              relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
              transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${viewMode === 'single' ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'}
            `}
          >
            {viewMode === 'single' ? (
              <>
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                切换至双工况对比
              </>
            ) : (
              <>
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                切换至单工况显示
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto h-full">
          {viewMode === 'single' ? (
            <div className="h-full">
              <ConditionPanel
                conditionId={leftCondition}
                onConditionChange={setLeftCondition}
                title="当前工况"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              <ConditionPanel
                conditionId={leftCondition}
                onConditionChange={setLeftCondition}
                title="对比工况 A"
              />
              <ConditionPanel
                conditionId={rightCondition}
                onConditionChange={setRightCondition}
                title="对比工况 B"
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2024 海泰台架试验分析系统 | 数据来源：台架试验中心</p>
        </div>
      </footer>
    </div>
  );
};

export default App;