import { Grid } from "antd";

const { useBreakpoint } = Grid;

const useIsMobile = () => {
  const screens = useBreakpoint();

  /**
   * AntD Breakpoints:
   * xs: < 576px
   * sm: ≥ 576px
   * md: ≥ 768px (Standard Tablet/Small Desktop)
   * lg: ≥ 992px
   */

  // We consider it "mobile" if the screen is smaller than the 'md' breakpoint
  // Note: During first render (SSR), all screens might be undefined.
  // We use !! to ensure a boolean return.
  const isMobile = screens.md === false;

  return isMobile;
};

export default useIsMobile;
