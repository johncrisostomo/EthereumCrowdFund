import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CrowdFundIndex extends Component {
    static async getInitialProps() {
        const crowdFunds = await factory.methods.getDeployedCrowdFunds().call();
        return { crowdFunds };
    }

    render() {
        const { crowdFunds } = this.props;

        return <div>{crowdFunds[0]}</div>;
    }
}

export default CrowdFundIndex;
