import * as React from 'react';
import { Text } from '@salt-ds/core';
import styles from './Aside.module.css';

const Aside = () => {
    return (
        /*<Box
              sx={{
                  width: {
                      sm: 200,
                      md: 0,
                  },
                  margin: {
                      sm: '1em',
                      md: 0,
                  },
                  overflowX: {
                      md: 'hidden',
                  },
              }}
        >*/
        <div className={styles.root}>
            <Text styleAs="h4">App Users</Text>
            <Text>
                Eiusmod adipisicing tempor duis qui. Ullamco aliqua tempor
                incididunt aliquip aliquip qui ad minim aliqua. Aute et magna
                quis pariatur irure sunt. Aliquip velit consequat dolore ullamco
                laborum voluptate cupidatat. Proident minim reprehenderit id
                dolore elit sit occaecat ad amet tempor esse occaecat enim.
                Laborum aliqua excepteur qui ipsum in dolor et cillum est.
            </Text>
        </div>
    );
};

export default Aside;
