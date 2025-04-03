import { useMediaQuery } from 'react-responsive';

export function useHeroWidth() {
  const isSmScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isLgScreen = useMediaQuery({ query: '(min-width: 1024px)' });
  const isXlScreen = useMediaQuery({ query: '(min-width: 1280px)' });
  const isXxlScreen = useMediaQuery({ query: '(min-width: 1536px)' });

  if (isXxlScreen) return 1504;
  if (isXlScreen) return 1248;
  if (isLgScreen) return 992;
  if (isSmScreen) return 608;

  return 736;
}
