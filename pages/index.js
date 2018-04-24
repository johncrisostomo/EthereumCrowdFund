import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import Layout from '../components/layout';
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
            <Layout>
                <div>
                    <h3>Open CrowdFunds</h3>

                    <Button
                        floated="right"
                        content="Add CrowdFund"
                        icon="add"
                        primary
                    />

                    {this.renderCrowdFund()}
                </div>
            </Layout>
        );
    }
}

export default CrowdFundIndex;
