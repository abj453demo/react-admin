import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import {
    ListBase,
    ListActions,
    useListContext,
    EditButton,
    Title,
} from 'react-admin';
import { Card, StackLayout, FlowLayout, Text, Button } from '@salt-ds/core';
import { ChevronRightIcon, ChevronDownIcon } from '@salt-ds/icons';
import styles from './TagList.module.css';

interface TagRecord {
    id: string;
    name: { en: string };
    parent_id?: string;
}

interface TreeNodeData {
    id: string;
    label: string;
    record: TagRecord;
    childNodes: TreeNodeData[];
}

const TagList = () => (
    <ListBase perPage={1000}>
        <StackLayout gap={0}>
            <ListActions />
            <div className={styles.treeContainer}>
                <Card>
                    <TagTree />
                </Card>
            </div>
        </StackLayout>
    </ListBase>
);

const TagTree = () => {
    const { data, defaultTitle } = useListContext<TagRecord>();
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleNode = useCallback((nodeId: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(nodeId)) {
                next.delete(nodeId);
            } else {
                next.add(nodeId);
            }
            return next;
        });
    }, []);

    const treeData = useMemo(() => {
        if (!data) return [];

        const buildTree = (parentId?: string): TreeNodeData[] => {
            return data
                .filter(node => node.parent_id === parentId)
                .map(node => ({
                    id: node.id,
                    label: node.name.en,
                    record: node,
                    childNodes: buildTree(node.id),
                }));
        };

        return buildTree(undefined);
    }, [data]);

    return (
        <div className={styles.tree} role="tree" aria-label={defaultTitle}>
            <Title defaultTitle={defaultTitle} />
            {treeData.map(node => (
                <TreeNode
                    key={node.id}
                    node={node}
                    level={0}
                    expandedIds={expandedIds}
                    onToggle={toggleNode}
                />
            ))}
        </div>
    );
};

interface TreeNodeProps {
    node: TreeNodeData;
    level: number;
    expandedIds: Set<string>;
    onToggle: (nodeId: string) => void;
}

const TreeNode = ({ node, level, expandedIds, onToggle }: TreeNodeProps) => {
    const hasChildren = node.childNodes.length > 0;
    const isExpanded = expandedIds.has(node.id);

    const handleToggle = useCallback(() => {
        if (hasChildren) {
            onToggle(node.id);
        }
    }, [hasChildren, onToggle, node.id]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleToggle();
            }
        },
        [handleToggle]
    );

    return (
        <div
            role="treeitem"
            aria-selected={false}
            aria-expanded={hasChildren ? isExpanded : undefined}
        >
            <FlowLayout
                className={styles.treeNode}
                style={{
                    paddingLeft: `calc(var(--salt-spacing-200) * ${level})`,
                }}
                gap={1}
                align="center"
            >
                <Button
                    variant="secondary"
                    appearance="transparent"
                    className={styles.toggleButton}
                    onClick={handleToggle}
                    onKeyDown={handleKeyDown}
                    aria-label={
                        hasChildren
                            ? isExpanded
                                ? 'Collapse'
                                : 'Expand'
                            : undefined
                    }
                    disabled={!hasChildren}
                >
                    {hasChildren ? (
                        isExpanded ? (
                            <ChevronDownIcon aria-hidden />
                        ) : (
                            <ChevronRightIcon aria-hidden />
                        )
                    ) : (
                        <span className={styles.spacer} />
                    )}
                </Button>
                <Text
                    className={styles.nodeLabel}
                    onClick={handleToggle}
                    style={{ cursor: hasChildren ? 'pointer' : 'default' }}
                >
                    {node.label}
                </Text>
                <EditButton record={node.record} />
            </FlowLayout>
            {hasChildren && isExpanded && (
                <div role="group" className={styles.childNodes}>
                    {node.childNodes.map(childNode => (
                        <TreeNode
                            key={childNode.id}
                            node={childNode}
                            level={level + 1}
                            expandedIds={expandedIds}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagList;
