import * as React from 'react';
import { isValidElement } from 'react';
import {
    useTranslate,
    ValidationError,
    type ValidationErrorMessage,
} from 'ra-core';

export const InputHelperText = (props: InputHelperTextProps) => {
    const { helperText, error } = props;
    const translate = useTranslate();

    if (error) {
        return <ValidationError error={error} />;
    }

    if (helperText === false) {
        return null;
    }

    if (isValidElement(helperText)) {
        return helperText;
    }

    if (typeof helperText === 'string' && helperText.length > 0) {
        return <>{translate(helperText, { _: helperText })}</>;
    }

    return null;
};

export interface InputHelperTextProps {
    helperText?: React.ReactNode;
    error?: ValidationErrorMessage;
}
