import { createContext, useContext, ReactNode } from 'react';
import { useLocalCharts } from '@/hooks/useLocalCharts';

type ChartsContextType = ReturnType<typeof useLocalCharts>;

const ChartsContext = createContext<ChartsContextType | null>(null);

export function ChartsProvider({ children }: { children: ReactNode }) {
    const chartsData = useLocalCharts();

    return (
        <ChartsContext.Provider value={chartsData}>
            {children}
        </ChartsContext.Provider>
    );
}

export function useCharts() {
    const context = useContext(ChartsContext);
    if (!context) {
        throw new Error('useCharts must be used within ChartsProvider');
    }
    return context;
}