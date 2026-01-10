import { useState, useCallback, useEffect } from 'react';
import { ChartDataPoint, ChartConfig, DEFAULT_CONFIG } from '@/types/chart';

export function useChartData() {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [config, setConfig] = useState<ChartConfig>(DEFAULT_CONFIG);
  const [xAxisColumn, setXAxisColumn] = useState<string>('');
  const [selectedYColumns, setSelectedYColumns] = useState<string[]>([]);

  // Auto-select X and Y columns when data is loaded
  useEffect(() => {
    if (columns.length > 0 && !xAxisColumn) {
      setXAxisColumn(columns[0]);
      // Auto-select all numeric columns as Y-axis
      if (columns.length > 1) {
        setSelectedYColumns(columns.slice(1));
      }
    }
  }, [columns, xAxisColumn]);

  const loadData = useCallback((newData: ChartDataPoint[], newColumns: string[]) => {
    setData(newData);
    setColumns(newColumns);
    // Reset axis selections for new data
    setXAxisColumn(newColumns[0] || '');
    setSelectedYColumns(newColumns.slice(1));
  }, []);

  const updateCell = useCallback((rowIndex: number, column: string, value: string | number) => {
    setData(prev => prev.map((row, idx) => 
      idx === rowIndex ? { ...row, [column]: value } : row
    ));
  }, []);

  const addRow = useCallback(() => {
    const newRow: ChartDataPoint = {};
    columns.forEach(col => {
      newRow[col] = '';
    });
    setData(prev => [...prev, newRow]);
  }, [columns]);

  const removeRow = useCallback((rowIndex: number) => {
    setData(prev => prev.filter((_, idx) => idx !== rowIndex));
  }, []);

  const updateColumnName = useCallback((oldName: string, newName: string) => {
    if (oldName === newName || !newName.trim()) return;
    
    setColumns(prev => prev.map(col => col === oldName ? newName : col));
    setData(prev => prev.map(row => {
      const newRow: ChartDataPoint = {};
      Object.entries(row).forEach(([key, value]) => {
        newRow[key === oldName ? newName : key] = value;
      });
      return newRow;
    }));

    // Update axis selections if affected
    if (xAxisColumn === oldName) {
      setXAxisColumn(newName);
    }
    setSelectedYColumns(prev => prev.map(col => col === oldName ? newName : col));
  }, [xAxisColumn]);

  const updateConfig = useCallback((updates: Partial<ChartConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const clearData = useCallback(() => {
    setData([]);
    setColumns([]);
    setConfig(DEFAULT_CONFIG);
    setXAxisColumn('');
    setSelectedYColumns([]);
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    if (columns.length > 0) {
      setXAxisColumn(columns[0]);
      setSelectedYColumns(columns.slice(1));
    }
  }, [columns]);

  const hasData = data.length > 0 && columns.length > 0;

  return {
    data,
    columns,
    config,
    hasData,
    xAxisColumn,
    selectedYColumns,
    loadData,
    updateCell,
    addRow,
    removeRow,
    updateColumnName,
    updateConfig,
    clearData,
    resetConfig,
    setXAxisColumn,
    setSelectedYColumns,
  };
}
