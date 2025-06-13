import { useMemo } from 'react';
import { useDebounce } from 'use-debounce';

export function useDebouncedFilters<T>(filters: T, delay = 500): T {
  const [debounced] = useDebounce(filters, delay);

  return useMemo(() => debounced, [debounced]);
}
