import * as React from 'react';
import { UserIcon } from '@salt-ds/icons';
import { Avatar, Card, FlowLayout, StackLayout, Text } from '@salt-ds/core';
import styles from './CommentList.module.css';
import { useIsSmall } from '../utils/useResponsive';
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
        <FlowLayout gap={2} wrap className={styles.commentGrid}>
            {data.map(record => (
                <div key={record.id} className={styles.commentCardWrapper}>
                    <Card className={styles.commentCard}>
                        <StackLayout gap={1}>
                            {/* Header section */}
                            <FlowLayout
                                gap={1}
                                align="center"
                                className={styles.cardHeader}
                            >
                                <Avatar fallbackIcon={<UserIcon />} />
                                <StackLayout
                                    gap={0}
                                    className={styles.cardHeaderText}
                                >
                                    <Text styleAs="h4">
                                        <TextField
                                            record={record}
                                            source="author.name"
                                        />
                                    </Text>
                                    <Text styleAs="label" color="secondary">
                                        <DateField
                                            record={record}
                                            source="created_at"
                                        />
                                    </Text>
                                </StackLayout>
                            </FlowLayout>

                            {/* Content section - body */}
                            <div className={styles.cardContent}>
                                <span className={styles.bodyText}>
                                    <TextField record={record} source="body" />
                                </span>
                            </div>

                            {/* Content section - post reference */}
                            <div className={styles.cardContentGrow}>
                                <Text as="span" data-testid="postLink">
                                    {translate('comment.list.about')}&nbsp;
                                </Text>
                                <ReferenceField
                                    record={record}
                                    source="post_id"
                                    reference="posts"
                                />
                            </div>

                            {/* Actions section */}
                            <FlowLayout
                                gap={1}
                                justify="end"
                                className={styles.cardActions}
                            >
                                <EditButton record={record} />
                                <ShowButton record={record} />
                            </FlowLayout>
                        </StackLayout>
                    </Card>
                </div>
            ))}
        </FlowLayout>
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
    const isSmall = useIsSmall();
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
