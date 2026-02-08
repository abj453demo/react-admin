import * as React from 'react';

interface CardContentProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const CardContent: React.FC<CardContentProps> = ({
    children,
    className,
    style,
}) => {
    return (
        <div
            className={className}
            style={{
                padding: 'var(--salt-spacing-100)',
                ...style,
            }}
        >
            {children}
        </div>
    );
};

export default CardContent;
