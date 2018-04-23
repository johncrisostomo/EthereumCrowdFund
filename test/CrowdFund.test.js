const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider);

const compiledFactory = require('../ethereum/build/CrowdFundFactory');
const compiledCrowdFund = require('../ethereum/build/CrowdFund');

let accounts;
let factory;
let crowdFundAddress;
let crowdFund;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await web3.eth
        .Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods
        .createCrowdFund('100')
        .send({ from: accounts[0], gas: '1000000' });

    [crowdFundAddress] = await factory.methods.getDeployedCrowdFunds.call();

    crowdFund = await web3.eth.Contract(
        JSON.parse(compiledCrowdFund.interface, crowdFundAddress)
    );
});
