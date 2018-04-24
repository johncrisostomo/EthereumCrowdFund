import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';

import { Link } from '../routes';
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
            description: (
                <Link route={`/crowdfunds/${address}`}>
                    <a>View Crowd Fund</a>
                </Link>
            ),
            fluid: true
        }));

        return <Card.Group items={items} />;
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open CrowdFunds</h3>

                    <Link route="/crowdfunds/new">
                        <a>
                            <Button
                                floated="right"
                                content="Add CrowdFund"
                                icon="add"
                                primary
                            />
                        </a>
                    </Link>

                    {this.renderCrowdFund()}
                </div>
            </Layout>
        );
    }
}

export default CrowdFundIndex;
