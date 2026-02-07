import * as React from 'react';

import { Button } from '@salt-ds/core';
import IconCancel from '@mui/icons-material/Cancel';

import { useTranslate } from 'react-admin';

const PostQuickCreateCancelButton = ({
    onClick,
    label = 'ra.action.cancel',
}) => {
    const translate = useTranslate();

    return (
        <Button
            style={{ margin: '10px 24px', position: 'relative' }}
            onClick={onClick}
            variant="secondary"
        >
            <IconCancel style={{ paddingRight: '0.5em' }} />
            {label && translate(label, { _: label })}
        </Button>
    );
};

export default PostQuickCreateCancelButton;
