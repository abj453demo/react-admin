import * as React from 'react';
import { StackLayout } from '@salt-ds/core';
import { DateField, ReferenceField, RecordField, Show } from 'react-admin';

const CommentShow = () => (
    <Show queryOptions={{ meta: { prefetch: ['post'] } }}>
        <StackLayout
            gap={1}
            style={{
                paddingTop: 'var(--salt-spacing-100)',
                paddingBottom: 'var(--salt-spacing-100)',
                paddingLeft: 'calc(var(--salt-spacing-100) * 2)',
                paddingRight: 'calc(var(--salt-spacing-100) * 2)',
            }}
        >
            <RecordField source="id" />
            <RecordField source="post_id">
                <ReferenceField source="post_id" reference="posts" />
            </RecordField>
            <RecordField source="author.name" />
            <RecordField field={DateField} source="created_at" />
            <RecordField source="body" />
        </StackLayout>
    </Show>
);

export default CommentShow;
