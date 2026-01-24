import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useChartData } from '../hooks/useChartData';

describe('useChartData Hook', () => {
    it('should initialize with empty data', () => {
        const { result } = renderHook(() => useChartData());
        expect(result.current.data).toEqual([]);
        expect(result.current.columns).toEqual([]);
    });

    it('should load new data and auto-select columns', () => {
        const { result } = renderHook(() => useChartData());
        const mockData = [{ Month: 'Jan', Sales: 100 }];
        const mockColumns = ['Month', 'Sales'];

        act(() => {
            result.current.loadData(mockData, mockColumns);
        });

        expect(result.current.data).toEqual(mockData);
        expect(result.current.xAxisColumn).toBe('Month');
        expect(result.current.selectedYColumns).toEqual(['Sales']);
    });
});