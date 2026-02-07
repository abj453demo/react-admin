import * as React from 'react';
import { useState } from 'react';
import {
    AutocompleteArrayInput,
    ReferenceArrayInput,
    useCreate,
    useCreateSuggestionContext,
    useLocaleState,
} from 'react-admin';
import { useFormContext } from 'react-hook-form';
import {
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Button,
    FormField,
    FormFieldLabel,
    Input,
} from '@salt-ds/core';

const TagReferenceInput = ({
    ...props
}: {
    reference: string;
    source: string;
    label?: string;
}) => {
    const { setValue } = useFormContext();
    const [published, setPublished] = useState(true);
    const [locale] = useLocaleState();

    const handleChangePublishedFilter = () => {
        setPublished(prev => !prev);
        setValue('tags', []);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '50%',
            }}
        >
            <ReferenceArrayInput {...props} perPage={5} filter={{ published }}>
                <AutocompleteArrayInput
                    create={<CreateTag />}
                    optionText={`name.${locale}`}
                    openOnFocus={false}
                />
            </ReferenceArrayInput>
            <Button
                name="change-filter"
                onClick={handleChangePublishedFilter}
                style={{
                    margin: '0 var(--salt-spacing-300)',
                    position: 'relative',
                }}
            >
                Filter {published ? 'Unpublished' : 'Published'} Tags
            </Button>
        </div>
    );
};

const CreateTag = () => {
    const { filter, onCancel, onCreate } = useCreateSuggestionContext();
    const [value, setValue] = React.useState(filter || '');
    const [create] = useCreate();
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        create(
            'tags',
            { data: { name: { en: value } } },

            {
                onSuccess: data => {
                    setValue('');
                    const choice = data;
                    onCreate(choice);
                },
            }
        );
        return false;
    };
    return (
        <Dialog open onOpenChange={open => !open && onCancel()}>
            <form onSubmit={handleSubmit}>
                <DialogHeader header="New Tag" />
                <DialogContent>
                    <FormField>
                        <FormFieldLabel>New tag</FormFieldLabel>
                        <Input
                            value={value}
                            onChange={event =>
                                setValue(
                                    (event.target as HTMLInputElement).value
                                )
                            }
                            autoFocus
                        />
                    </FormField>
                </DialogContent>
                <DialogActions>
                    <Button type="submit">Save</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default TagReferenceInput;
