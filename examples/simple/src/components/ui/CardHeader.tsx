import * as React from 'react';
import { FlowLayout, Text, StackLayout } from '@salt-ds/core';

interface CardHeaderProps {
    title?: React.ReactNode;
    subheader?: React.ReactNode;
    avatar?: React.ReactNode;
    action?: React.ReactNode;
    className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
    title,
    subheader,
    avatar,
    action,
    className,
}) => {
    return (
        <FlowLayout
            gap={1}
            align="center"
            justify="space-between"
            className={className}
            style={{ padding: 'var(--salt-spacing-100)' }}
        >
            <FlowLayout gap={1} align="center">
                {avatar}
                <StackLayout gap={0}>
                    {title && (
                        <Text styleAs="h4" style={{ margin: 0 }}>
                            {title}
                        </Text>
                    )}
                    {subheader && (
                        <Text
                            styleAs="label"
                            color="secondary"
                            style={{ margin: 0 }}
                        >
                            {subheader}
                        </Text>
                    )}
                </StackLayout>
            </FlowLayout>
            {action}
        </FlowLayout>
    );
};

export default CardHeader;
