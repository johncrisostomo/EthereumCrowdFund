import React from 'react';
import { Menu } from 'semantic-ui-react';

import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ marginTop: 10 }}>
            <Link route="/">
                <a className="item">Ethereum CrowdFund</a>
            </Link>
            <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">CrowdFunds</a>
                </Link>
                <Link route="/crowdfunds/new">
                    <a className="item">+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};
