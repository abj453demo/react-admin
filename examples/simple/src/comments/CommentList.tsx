import * as React from 'react';
import { UserIcon } from '@salt-ds/icons';
import { Grid, useMediaQuery, Theme } from '@mui/material';
import { Avatar, Card, Text } from '@salt-ds/core';
import jsonExport from 'jsonexport/dist';
import {
    ListBase,
    ListToolbar,
    ListActions,
    DateField,
    EditButton,
    Pagination,
    ReferenceField,
    ReferenceInput,
    SearchInput,
    ShowButton,
    SimpleList,
    TextField,
    Title,
    downloadCSV,
    useListContext,
    useTranslate,
    Exporter,
} from 'react-admin';

const commentFilters = [
    <SearchInput source="q" alwaysOn />,
    <ReferenceInput source="post_id" reference="posts" />,
];

const exporter: Exporter = (records, fetchRelatedRecords) =>
    fetchRelatedRecords(records, 'post_id', 'posts').then(posts => {
        const data = records.map(record => {
            const { author, ...recordForExport } = record; // omit author
            recordForExport.author_name = author.name;
            recordForExport.post_title = posts[record.post_id].title;
            return recordForExport;
        });
        const headers = [
            'id',
            'author_name',
            'post_id',
            'post_title',
            'created_at',
            'body',
        ];

        return jsonExport(data, { headers }, (error, csv) => {
            if (error) {
                console.error(error);
            }
            downloadCSV(csv, 'comments');
        });
    });

const CommentGrid = () => {
    const { data } = useListContext();
    const translate = useTranslate();

    if (!data) return null;
    return (
        <Grid spacing={2} container>
            {data.map(record => (
                <Grid item key={record.id} sm={12} md={6} lg={4}>
                    <Card
                        style={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Card Header */}
                        <div
                            className="comment"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '16px',
                                gap: '16px',
                            }}
                        >
                            <Avatar>
                                <UserIcon />
                            </Avatar>
                            <div>
                                <div style={{ fontWeight: 500 }}>
                                    <TextField
                                        record={record}
                                        source="author.name"
                                    />
                                </div>
                                <div
                                    style={{
                                        color: 'var(--salt-content-secondary-foreground)',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    <DateField
                                        record={record}
                                        source="created_at"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Card Content - Body */}
                        <div style={{ padding: '0 16px 16px' }}>
                            <TextField
                                record={record}
                                source="body"
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                }}
                            />
                        </div>
                        {/* Card Content - Reference */}
                        <div style={{ padding: '0 16px 16px', flexGrow: 1 }}>
                            <Text as="span" data-testid="postLink">
                                {translate('comment.list.about')}&nbsp;
                            </Text>
                            <ReferenceField
                                record={record}
                                source="post_id"
                                reference="posts"
                            />
                        </div>
                        {/* Card Actions */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                padding: '8px',
                                gap: '8px',
                            }}
                        >
                            <EditButton record={record} />
                            <ShowButton record={record} />
                        </div>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

const CommentMobileList = () => (
    <SimpleList
        primaryText={record => record.author.name}
        secondaryText={record => record.body}
        tertiaryText={record =>
            new Date(record.created_at).toLocaleDateString()
        }
        leftAvatar={() => <UserIcon />}
    />
);

const CommentList = () => (
    <ListBase
        perPage={6}
        exporter={exporter}
        queryOptions={{ meta: { prefetch: ['post'] } }}
    >
        <ListView />
    </ListBase>
);

const ListView = () => {
    const isSmall = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));
    const { defaultTitle } = useListContext();
    return (
        <>
            <Title defaultTitle={defaultTitle} />
            <ListToolbar filters={commentFilters} actions={<ListActions />} />
            {isSmall ? <CommentMobileList /> : <CommentGrid />}
            <Pagination rowsPerPageOptions={[6, 9, 12]} />
        </>
    );
};

export default CommentList;
