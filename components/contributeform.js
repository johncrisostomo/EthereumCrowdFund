import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import { Router } from '../routes';

import crowdfundHelper from '../ethereum/crowdfund';
import web3 from '../ethereum/web3';

class ContributeForm extends Component {
    state = { value: '', isLoading: false, errorMessage: '' };

    onSubmit = async event => {
        event.preventDefault();

        const { address } = this.props;
        const { value } = this.state;

        this.setState({ isLoading: true, errorMessage: '' });

        const crowdfund = crowdfundHelper(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await crowdfund.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            Router.replaceRoute(`/crowdfunds/${address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ isLoading: false, value: '' });
    };

    render() {
        const { errorMessage, isLoading } = this.state;
        return (
            <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        label="ETH"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event =>
                            this.setState({ value: event.target.value })
                        }
                    />
                </Form.Field>

                <Message
                    error
                    header="This is embarassing."
                    content={errorMessage}
                />

                <Button loading={isLoading} primary>
                    Contribute
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
