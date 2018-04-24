import React from 'react';
import { Menu } from 'semantic-ui-react';

export default () => {
    return (
        <Menu style={{ marginTop: 10 }}>
            <Menu.Item>Ethereum CrowdFund</Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>CrowdFunds</Menu.Item>
                <Menu.Item>+</Menu.Item>
            </Menu.Menu>
        </Menu>
    );
};
