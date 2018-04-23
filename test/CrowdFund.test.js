const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledFactory = require('../ethereum/build/CrowdFundFactory');
const compiledCrowdFund = require('../ethereum/build/CrowdFund');

let accounts;
let factory;
let crowdFundAddress;
let crowdFund;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods
        .createCrowdFund('100')
        .send({ from: accounts[0], gas: '1000000' });

    [crowdFundAddress] = await factory.methods.getDeployedCrowdFunds().call();

    crowdFund = await new web3.eth.Contract(
        JSON.parse(compiledCrowdFund.interface),
        crowdFundAddress
    );
});

describe('CrowdFunds', () => {
    it('deploys a factory and a crowd fund', async () => {
        assert.ok(factory.options.address);
        assert.ok(crowdFund.options.address);
    });
});