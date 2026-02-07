import { useBreakpoint } from '@salt-ds/core';

export const useIsSmall = () => {
    const breakpoint = useBreakpoint();
    return breakpoint === 'xs' || breakpoint === 'sm';
};

export const useIsMediumDown = () => {
    const breakpoint = useBreakpoint();
    return breakpoint === 'xs' || breakpoint === 'sm' || breakpoint === 'md';
};
