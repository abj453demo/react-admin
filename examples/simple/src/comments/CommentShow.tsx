import * as React from 'react';
import { DateField, ReferenceField, RecordField, Show } from 'react-admin';
import { StackLayout } from '@salt-ds/core';

const CommentShow = () => (
    <Show queryOptions={{ meta: { prefetch: ['post'] } }}>
        <StackLayout
            gap={1}
            style={{
                paddingTop: '8px',
                paddingBottom: '8px',
                paddingLeft: '16px',
                paddingRight: '16px',
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
