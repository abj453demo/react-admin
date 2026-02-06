import type { InputProps } from 'ra-core';

export type CommonInputProps = InputProps & {
    cellClassName?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    headerCellClassName?: string;
    readOnly?: boolean;
};
