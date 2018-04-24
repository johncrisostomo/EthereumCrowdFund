import web3 from './web3';
import CrowdFundFactory from './build/CrowdFundFactory.json';
import { contractAddress } from './settings.json';

const contract = new web3.eth.Contract(
    JSON.parse(CrowdFundFactory.interface),
    contractAddress
);

export default contract;
