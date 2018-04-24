import Web3 from 'web3';
import { infuraApiKey } from './settings.json';

let web3;
const network = 'rinkeby';

if (typeof window !== 'undefined' && window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
} else {
    const provider = new Web3.providers.HttpProvider(
        `https://${network}.infura.io/${infuraApiKey}`
    );

    web3 = new Web3(provider);
}

export default web3;
