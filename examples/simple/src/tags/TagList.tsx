import * as React from 'react';
import { useMemo, useState, useCallback } from 'react';
import {
    ListBase,
    ListActions,
    useListContext,
    EditButton,
    Title,
} from 'react-admin';
import { Box, Stack } from '@mui/material';
import {
    Card as SaltCard,
    FlowLayout,
    StackLayout,
    Text,
    Button,
} from '@salt-ds/core';
import { ChevronDownIcon, ChevronRightIcon } from '@salt-ds/icons';

import styles from './TagList.module.css';

interface TagRecord {
    id: string;
    name: { en: string };
    parent_id?: string;
}

interface TagTreeNode {
    id: string;
    name: string;
    record: TagRecord;
    childNodes?: TagTreeNode[];
}

const TagList = () => (
    <ListBase perPage={1000}>
        <Stack>
            <ListActions />
            <Box maxWidth="20em" marginTop="1em">
                <SaltCard className={styles.tagCard}>
                    <TagTree />
                </SaltCard>
            </Box>
        </Stack>
    </ListBase>
);

const TagTree = () => {
    const { data, defaultTitle } = useListContext<TagRecord>();
    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

    const toggleNode = useCallback((nodeId: string) => {
        setExpandedNodes(prev => {
            const next = new Set(prev);
            if (next.has(nodeId)) {
                next.delete(nodeId);
            } else {
                next.add(nodeId);
            }
            return next;
        });
    }, []);

    const treeSource = useMemo(() => {
        if (!data) return [];

        const buildTree = (parentId?: string): TagTreeNode[] => {
            return data
                .filter(node =>
                    parentId === undefined
                        ? typeof node.parent_id === 'undefined'
                        : node.parent_id === parentId
                )
                .map(node => {
                    const children = buildTree(node.id);
                    return {
                        id: node.id,
                        name: node.name.en,
                        record: node,
                        childNodes: children.length > 0 ? children : undefined,
                    };
                });
        };

        return buildTree();
    }, [data]);

    return (
        <StackLayout gap={0}>
            <Title defaultTitle={defaultTitle} />
            <ul role="tree" className={styles.tree}>
                {treeSource.map(root => (
                    <TreeNodeItem
                        key={root.id}
                        node={root}
                        level={0}
                        expandedNodes={expandedNodes}
                        onToggle={toggleNode}
                    />
                ))}
            </ul>
        </StackLayout>
    );
};

interface TreeNodeItemProps {
    node: TagTreeNode;
    level: number;
    expandedNodes: Set<string>;
    onToggle: (nodeId: string) => void;
}

const TreeNodeItem = ({
    node,
    level,
    expandedNodes,
    onToggle,
}: TreeNodeItemProps) => {
    const hasChildren = node.childNodes && node.childNodes.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
        <li
            role="treeitem"
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-selected={false}
        >
            <FlowLayout
                gap={1}
                align="center"
                className={styles.treeItem}
                style={{
                    paddingLeft: `calc(var(--salt-spacing-200) * ${level})`,
                }}
            >
                {hasChildren ? (
                    <Button
                        variant="secondary"
                        appearance="transparent"
                        onClick={() => onToggle(node.id)}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                        className={styles.toggleButton}
                    >
                        {isExpanded ? (
                            <ChevronDownIcon />
                        ) : (
                            <ChevronRightIcon />
                        )}
                    </Button>
                ) : (
                    <span className={styles.togglePlaceholder} />
                )}
                <Text styleAs="label" className={styles.nodeLabel}>
                    {node.name}
                </Text>
                <EditButton record={node.record} />
            </FlowLayout>
            {hasChildren && isExpanded && (
                <ul role="group" className={styles.childNodes}>
                    {node.childNodes?.map(child => (
                        <TreeNodeItem
                            key={child.id}
                            node={child}
                            level={level + 1}
                            expandedNodes={expandedNodes}
                            onToggle={onToggle}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default TagList;
