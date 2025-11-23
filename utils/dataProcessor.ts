import { DataPoint } from '../types';
import { RAW_PREDICT_FILES, RAW_EXPERIMENT_FILES } from '../constants';

const parseRawText = (text: string): { time: number; value: number }[] => {
  if (!text) return [];
  const lines = text.trim().split('\n');
  const data: { time: number; value: number }[] = [];

  lines.forEach((line) => {
    // Handle both tabs and spaces
    const parts = line.trim().split(/\s+/);
    if (parts.length >= 2) {
      const time = parseFloat(parts[0]);
      const value = parseFloat(parts[1]);
      if (!isNaN(time) && !isNaN(value)) {
        data.push({ time, value });
      }
    }
  });
  return data;
};

export const getChartData = (conditionId: number): DataPoint[] => {
  const predictRaw = RAW_PREDICT_FILES[conditionId.toString()];
  const experimentRaw = RAW_EXPERIMENT_FILES[conditionId.toString()];

  if (!predictRaw && !experimentRaw) {
    return [];
  }

  const predictData = parseRawText(predictRaw);
  const experimentData = parseRawText(experimentRaw);

  // Map to store combined data points by time
  const combinedMap = new Map<number, DataPoint>();

  // Add prediction data
  predictData.forEach((p) => {
    // Use fixed precision to avoid floating point key mismatches
    const key = Math.round(p.time * 100) / 100;
    if (!combinedMap.has(key)) {
      combinedMap.set(key, { time: key });
    }
    const item = combinedMap.get(key)!;
    item.predict = p.value;
  });

  // Add experiment data
  experimentData.forEach((e) => {
    const key = Math.round(e.time * 100) / 100;
    if (!combinedMap.has(key)) {
      combinedMap.set(key, { time: key });
    }
    const item = combinedMap.get(key)!;
    item.experiment = e.value;
  });

  // Convert map to array and sort by time
  return Array.from(combinedMap.values()).sort((a, b) => a.time - b.time);
};