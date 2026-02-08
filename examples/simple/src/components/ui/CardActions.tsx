import * as React from 'react';
import { FlowLayout } from '@salt-ds/core';

interface CardActionsProps {
    children?: React.ReactNode;
    className?: string;
    justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around';
}

export const CardActions: React.FC<CardActionsProps> = ({
    children,
    className,
    justify = 'end',
}) => {
    return (
        <FlowLayout
            gap={1}
            justify={justify}
            className={className}
            style={{ padding: 'var(--salt-spacing-100)' }}
        >
            {children}
        </FlowLayout>
    );
};

export default CardActions;
