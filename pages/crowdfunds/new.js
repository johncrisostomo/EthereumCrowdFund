import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Layout from '../../components/layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CrowdFundsNew extends Component {
    state = { minimumContribution: '', errorMessage: '' };

    onSubmit = async event => {
        event.preventDefault();
        const { minimumContribution } = this.state;

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods
                .createCrowdFund(minimumContribution)
                .send({ from: accounts[0] });
            this.setState({ errorMessage: '' });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
    };

    render() {
        const { errorMessage } = this.state;

        return (
            <Layout>
                <h3>Create a new CrowdFund</h3>
                <Form onSubmit={this.onSubmit} error={!!errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label="wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event =>
                                this.setState({
                                    minimumContribution: event.target.value
                                })
                            }
                        />
                    </Form.Field>

                    <Message
                        error
                        header="This is embarassing."
                        content={errorMessage}
                    />
                    <Button content="Create" primary />
                </Form>
            </Layout>
        );
    }
}

export default CrowdFundsNew;
