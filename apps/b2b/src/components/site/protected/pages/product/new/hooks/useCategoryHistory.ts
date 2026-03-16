import { useCallback, useRef, useState } from 'react';

export function useCategoryHistory(initial: string[]) {
  const [current, setCurrent] = useState(initial);
  const backStack = useRef<string[][]>([]);
  const forwardStack = useRef<string[][]>([]);

  const goBack = useCallback(() => {
    if (backStack.current.length === 0) return;
    forwardStack.current.push(current);
    const prev = backStack.current.pop()!;
    setCurrent(prev);
  }, [current]);

  const goForward = useCallback(
    (next: string[]) => {
      backStack.current.push(current);
      forwardStack.current = [];
      setCurrent(next);
    },
    [current],
  );

  return { current, goBack, goForward };
}
