import * as React from 'react';
import { Button as SaltButton, Button } from '@salt-ds/core';
import { CloseIcon } from '@salt-ds/icons';

import IconCancel from '@mui/icons-material/Cancel';

import { useTranslate } from 'react-admin';

const PostQuickCreateCancelButton = ({
    onClick,
    label = 'ra.action.cancel',
}) => {
    const translate = useTranslate();

    return (
        <Button
            variant="secondary"
            style={{ margin: '10px 24px', position: 'relative' }}
            onClick={onClick}
        >
            <IconCancel style={{ paddingRight: '0.5em' }} />
            {label && translate(label, { _: label })}
        </Button>
    );
};

export default PostQuickCreateCancelButton;
