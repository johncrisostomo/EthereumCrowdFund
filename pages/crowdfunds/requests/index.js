import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/layout';

import RequestRow from '../../../components/requestrow';

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

    renderRow = () => {
        return this.props.requests.map((request, index) => {
            return (
                <RequestRow
                    request={request}
                    id={index}
                    key={index}
                    address={this.props.address}
                />
            );
        });
    };

    render() {
        const { address } = this.props;
        const { Header, Row, HeaderCell, Body } = Table;

        return (
            <Layout>
                <h3>Request List</h3>
                <Link route={`/crowdfunds/${address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>

                    <Body>{this.renderRow()}</Body>
                </Table>
            </Layout>
        );
    }
}

export default RequestIndex;
