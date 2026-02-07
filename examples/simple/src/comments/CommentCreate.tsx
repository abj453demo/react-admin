import * as React from 'react';

import {
    Create,
    DateInput,
    TextInput,
    SimpleFormConfigurable,
    minLength,
} from 'react-admin';
import PostReferenceInput from './PostReferenceInput';
import styles from './CommentCreate.module.css';

const now = new Date();

const CommentCreate = () => (
    <Create redirect={false}>
        <SimpleFormConfigurable className={styles.formContainer}>
            <PostReferenceInput />
            <TextInput source="author.name" validate={minLength(10)} />
            <DateInput source="created_at" defaultValue={now} />
            <TextInput source="body" multiline />
        </SimpleFormConfigurable>
    </Create>
);

export default CommentCreate;
