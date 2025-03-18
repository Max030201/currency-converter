import { useMemo } from 'react';

export function useRatesStats(rates, currencies, base) {
  const stats = useMemo(() => {
    if (!rates || rates.length === 0) return {
      strongest: null,
      weakest: null,
      total: 0,
      updatedAt: null
    };
    const withoutBase = rates.filter(r => r.code !== base && !isNaN(r.rate));
    if (withoutBase.length === 0) return {
      strongest: null,
      weakest: null,
      total: rates.length,
      updatedAt: rates?.updatedAt || null
    };
    const strongest = withoutBase.reduce((a, b) => (a.changePercent > b.changePercent ? a : b));
    const weakest = withoutBase.reduce((a, b) => (a.changePercent < b.changePercent ? a : b));
    return {
      strongest: {
        name: currencies.find(c => c.code === strongest.code)?.label || strongest.code,
        code: strongest.code,
        change: strongest.changePercent
      },
      weakest: {
        name: currencies.find(c => c.code === weakest.code)?.label || weakest.code,
        code: weakest.code,
        change: weakest.changePercent
      },
      total: rates.length,
      updatedAt: rates?.updatedAt || null
    };
  }, [rates, currencies, base]);

  return { stats };
} 