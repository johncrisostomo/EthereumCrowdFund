import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';

import crowdfundHelper from '../../../ethereum/crowdfund';
import web3 from '../../../ethereum/web3';

import Layout from '../../../components/layout';

class RequestsNew extends Component {
    state = {
        value: '',
        description: '',
        recipient: '',
        isLoading: false,
        errorMessage: ''
    };

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();
        const { address } = this.props;
        const { description, value, recipient } = this.state;

        this.setState({ isLoading: true, errorMessage: '' });

        const crowdfund = crowdfundHelper(address);

        try {
            const accounts = await web3.eth.getAccounts();
            await crowdfund.methods
                .createRequest(
                    description,
                    web3.utils.toWei(value, 'ether'),
                    recipient
                )
                .send({
                    from: accounts[0]
                });
            Router.pushRoute(`/crowdfounds/${address}/requests`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ isLoading: false });
    };

    render() {
        return (
            <Layout>
                <Link route={`/crowdfunds/${this.props.address}/requests`}>
                    <a>Back</a>
                </Link>
                <h3>Create a request</h3>
                <Form
                    onSubmit={this.onSubmit}
                    error={!!this.state.errorMessage}
                >
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event =>
                                this.setState({
                                    description: event.target.value
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in ETH</label>
                        <Input
                            label="ETH"
                            labelPosition="right"
                            value={this.state.value}
                            onChange={event =>
                                this.setState({
                                    value: event.target.value
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event =>
                                this.setState({
                                    recipient: event.target.value
                                })
                            }
                        />
                    </Form.Field>
                    <Message
                        error
                        header="This is embarassing."
                        content={this.state.errorMessage}
                    />
                    <Button loading={this.state.isLoading} primary>
                        Create
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestsNew;
