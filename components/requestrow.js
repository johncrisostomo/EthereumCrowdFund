import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

import crowdfundHelper from '../ethereum/crowdfund';

class RequestRow extends Component {
    onApprove = async () => {
        const { id, address } = this.props;
        const accounts = await web3.eth.getAccounts();

        const crowdfund = crowdfundHelper(address);

        await crowdfund.methods.approveRequest(id).send({
            from: accounts[0]
        });
    };

    onFinalize = async () => {
        const { id, address } = this.props;
        const accounts = await web3.eth.getAccounts();

        const crowdfund = crowdfundHelper(address);

        await crowdfund.methods.finalizeRequest(id).send({
            from: accounts[0]
        });
    };

    render() {
        const { Row, Cell } = Table;

        const {
            id,
            request: { description, value, recipient, approvalCount },
            approversCount
        } = this.props;

        return (
            <Row>
                <Cell>{id}</Cell>
                <Cell>{description}</Cell>
                <Cell>{web3.utils.fromWei(value, 'ether') + 'ETH'}</Cell>
                <Cell>{recipient}</Cell>
                <Cell>
                    {approvalCount} / {approversCount}
                </Cell>
                <Cell>
                    <Button color="green" basic onClick={this.onApprove}>
                        Approve
                    </Button>
                </Cell>
                <Cell>
                    <Button color="teal" basic onClick={this.onFinalize}>
                        Finalize
                    </Button>
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;
