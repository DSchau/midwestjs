export const BREAKPOINTS = {
  xs: 0,
  small: 400,
  medium: 768,
  large: 1024,
};

export const DIMENSIONS = {
  greaterThan(breakpointStr) {
    const breakpoint = BREAKPOINTS[breakpointStr] || 0;
    return (...styles) => {
      const style = Object.keys(styles).reduce((merged, key) => {
        return Object.assign(merged, styles[key]);
      }, {});
      return {
        [`@media only screen and (min-width: ${breakpoint}px)`]: style,
      };
    };
  },
};
