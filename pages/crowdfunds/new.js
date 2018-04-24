import React, { Component } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import Layout from '../../components/layout';

class CrowdFundsNew extends Component {
    render() {
        return (
            <Layout>
                <h3>Create a new CrowdFund</h3>
                <Form>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input label="wei" labelPosition="right" />
                    </Form.Field>
                    <Button content="Create" primary />
                </Form>
            </Layout>
        );
    }
}

export default CrowdFundsNew;
