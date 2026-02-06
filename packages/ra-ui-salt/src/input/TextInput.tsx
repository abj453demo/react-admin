import * as React from 'react';
import clsx from 'clsx';
import { useInput, FieldTitle } from 'ra-core';
import {
    FormField,
    FormFieldLabel,
    FormFieldHelperText,
    Input,
} from '@salt-ds/core';

import type { CommonInputProps } from './CommonInputProps';
import { InputHelperText } from './InputHelperText';

export interface TextInputProps extends CommonInputProps {
    className?: string;
    type?: string;
    placeholder?: string;
}

export const TextInput = (props: TextInputProps) => {
    const {
        className,
        defaultValue,
        label,
        format,
        helperText,
        onBlur,
        onChange,
        parse,
        resource,
        source,
        validate,
        type = 'text',
        placeholder,
        disabled,
        readOnly,
        fullWidth,
        ...rest
    } = props;

    const {
        field,
        fieldState: { error, invalid },
        id,
        isRequired,
    } = useInput({
        defaultValue,
        format,
        parse,
        resource,
        source,
        type,
        validate,
        onBlur,
        onChange,
        ...rest,
    });

    const renderHelperText = helperText !== false || invalid;

    const validationStatus = invalid ? 'error' : undefined;

    return (
        <FormField
            className={clsx('ra-input', `ra-input-${source}`, className)}
            validationStatus={validationStatus}
            necessity={isRequired ? 'required' : undefined}
            disabled={disabled}
            readOnly={readOnly}
            style={fullWidth ? { width: '100%' } : undefined}
        >
            {label !== '' && label !== false && (
                <FormFieldLabel>
                    <FieldTitle
                        label={label}
                        source={source}
                        resource={resource}
                        isRequired={isRequired}
                    />
                </FormFieldLabel>
            )}
            <Input
                id={id}
                value={field.value ?? ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                inputRef={field.ref}
                inputProps={{
                    name: field.name,
                    type,
                }}
                placeholder={placeholder}
            />
            {renderHelperText && (
                <FormFieldHelperText>
                    <InputHelperText
                        error={error?.message}
                        helperText={helperText}
                    />
                </FormFieldHelperText>
            )}
        </FormField>
    );
};
