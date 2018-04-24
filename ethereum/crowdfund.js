import web3 from './web3';
import CrowdFund from './build/CrowdFund.json';

export default address => {
    return new web3.eth.Contract(JSON.parse(CrowdFund.interface), address);
};
