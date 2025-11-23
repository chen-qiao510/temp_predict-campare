export interface DataPoint {
  time: number;
  predict?: number;
  experiment?: number;
}

export interface MetricData {
  maxDiff: number;
  mape: number;
  r2: number;
  rmse: number;
}

export interface ConditionMetrics {
  [key: number]: MetricData;
}

export interface RawDataMap {
  [key: string]: string;
}

export type ViewMode = 'single' | 'dual';