import * as React from 'react';
import styles from './CommentCreate.module.css';

import {
    Create,
    DateInput,
    TextInput,
    SimpleFormConfigurable,
    minLength,
} from 'react-admin';
import PostReferenceInput from './PostReferenceInput';

const now = new Date();

const CommentCreate = () => (
    <Create redirect={false}>
        <SimpleFormConfigurable className={styles.form}>
            <PostReferenceInput />
            <TextInput source="author.name" validate={minLength(10)} />
            <DateInput source="created_at" defaultValue={now} />
            <TextInput source="body" multiline />
        </SimpleFormConfigurable>
    </Create>
);

export default CommentCreate;
