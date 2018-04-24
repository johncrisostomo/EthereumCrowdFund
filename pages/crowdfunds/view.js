import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';

import Layout from '../../components/layout';
import ContributeForm from '../../components/contributeform';

import web3 from '../../ethereum/web3';
import crowdFundHelper from '../../ethereum/crowdfund';

class CrowdFundView extends Component {
    static async getInitialProps(props) {
        const crowdfund = crowdFundHelper(props.query.address);
        const summary = await crowdfund.methods.getSummary().call();

        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards = () => {
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                description:
                    'The address of the manager who created this CrowdFund and can create requisition requests',
                meta: 'Address of CF Manager',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                description:
                    'Minimum amount you can contribute to become an approver',
                meta: 'Minimum Contribution (wei)'
            },
            {
                header: requestsCount,
                description:
                    'A requisition request for buying stuff and sending a certain amount to a vendor',
                meta: 'Number of Requests'
            },
            {
                header: approversCount,
                description:
                    'Number of people who have already contributed and can approve requests',
                meta: 'Number of Approvers'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                description: 'Current balance of this CrowdFund',
                meta: 'CrowdFund Balance (ETH)'
            }
        ];

        return <Card.Group items={items} />;
    };

    render() {
        return (
            <Layout>
                <h3>CrowdFund Details</h3>
                {this.renderCards()}
                <ContributeForm />
            </Layout>
        );
    }
}

export default CrowdFundView;
