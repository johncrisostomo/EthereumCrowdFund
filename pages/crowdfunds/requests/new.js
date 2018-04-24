import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import { Link } from '../../../routes';

import crowdfundHelper from '../../../ethereum/crowdfund';
import web3 from '../../../ethereum/web3';

import Layout from '../../../components/layout';

class RequestsNew extends Component {
    state = { value: '', description: '', recipient: '' };
    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    render() {
        return (
            <Layout>
                <h3>Create a request</h3>
                <Form>
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
                    <Button primary>Create</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestsNew;
