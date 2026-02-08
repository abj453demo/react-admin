import * as React from 'react';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
} from '@salt-ds/core';
import { useCallback } from 'react';
import {
    SaveButton,
    Form,
    TextInput,
    required,
    useCreate,
    useCreateSuggestionContext,
    useNotify,
    useTranslate,
} from 'react-admin';

import CancelButton from './PostQuickCreateCancelButton';

const PostQuickCreate = props => {
    const [create] = useCreate();
    const notify = useNotify();

    const { onCancel, onCreate } = useCreateSuggestionContext();
    const handleSave = useCallback(
        values => {
            create(
                'posts',
                { data: values },
                {
                    onSuccess: data => {
                        onCreate(data);
                    },
                    onError: (error: Error) => {
                        notify(error.message, { type: 'error' });
                    },
                }
            );
        },
        [create, notify, onCreate]
    );

    const translate = useTranslate();

    return (
        <Dialog
            data-testid="dialog-add-post"
            open
            onOpenChange={open => !open && onCancel()}
            aria-label={translate('simple.create-post')}
        >
            <Form onSubmit={handleSave} {...props}>
                <DialogHeader header={translate('simple.create-post')} />
                <DialogContent>
                    <TextInput
                        defaultValue=""
                        source="title"
                        validate={required()}
                    />
                    <TextInput
                        defaultValue=""
                        source="teaser"
                        validate={required()}
                        multiline={true}
                    />
                </DialogContent>
                <DialogActions>
                    <SaveButton />
                    <CancelButton onClick={onCancel} />
                </DialogActions>
            </Form>
        </Dialog>
    );
};

export default PostQuickCreate;
