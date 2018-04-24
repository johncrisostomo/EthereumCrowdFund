import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import Head from '../components/head';
import factory from '../ethereum/factory';

class CrowdFundIndex extends Component {
    static async getInitialProps() {
        const crowdFunds = await factory.methods.getDeployedCrowdFunds().call();
        return { crowdFunds };
    }

    renderCrowdFund() {
        const { crowdFunds } = this.props;
        const items = crowdFunds.map(address => ({
            header: address,
            description: <a>View Crowd Fund</a>,
            fluid: true
        }));

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <div>
                <Head />
                {this.renderCrowdFund()}
            </div>
        );
    }
}

export default CrowdFundIndex;
