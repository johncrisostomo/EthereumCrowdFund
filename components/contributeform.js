import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';

import crowdfundHelper from '../ethereum/crowdfund';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
    state = { value: '', isLoading: false };

    onSubmit = async event => {
        event.preventDefault();

        const { address } = this.props;
        const { value } = this.state;

        this.setState({ isLoading: true });

        const crowdfund = crowdfundHelper(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await crowdfund.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
        } catch (err) {}

        this.setState({ isLoading: false });
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        label="ETH"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event =>
                            this.setState({ value: event.target.value })
                        }
                        loading={this.state.isLoading}
                    />
                </Form.Field>
                <Button primary>Contribute</Button>
            </Form>
        );
    }
}

export default ContributeForm;
