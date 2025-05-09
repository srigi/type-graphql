import type { VNode } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export function useDelayedLoader(isFetching: boolean, loader: VNode = <div>Loading...</div>, delay = 500) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isFetching) {
      timer = setTimeout(() => setShowLoader(true), delay);

      return () => {
        clearTimeout(timer);
        setShowLoader(false);
      };
    }

    return () => {
      setShowLoader(false);
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [isFetching, delay]);

  return {
    renderLoader: () => (isFetching ? (showLoader ? loader : null) : null),
  };
}
