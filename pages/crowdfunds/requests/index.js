import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';

import crowdfundHelper from '../../../ethereum/crowdfund';

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const crowdfund = crowdfundHelper(address);
        const requestsCount = await crowdfund.methods.getRequestsCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index) => {
                    return crowdfund.methods.requests(index).call();
                })
        );

        return { address, requests, requestsCount };
    }

    render() {
        const { address } = this.props;

        return (
            <Layout>
                <h3>Request List</h3>
                <Link route={`/crowdfunds/${address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;
