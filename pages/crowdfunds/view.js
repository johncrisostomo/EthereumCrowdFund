import React, { Component } from 'react';
import Layout from '../../components/layout';
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

    render() {
        return (
            <Layout>
                <h3>CrowdFund Details</h3>
            </Layout>
        );
    }
}

export default CrowdFundView;
