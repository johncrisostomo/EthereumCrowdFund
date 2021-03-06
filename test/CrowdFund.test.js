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

    it('marks caller as the crowd fund manager', async () => {
        const manager = await crowdFund.methods.manager().call();
        assert.equal(manager, accounts[0]);
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await crowdFund.methods
            .contribute()
            .send({ value: '200', from: accounts[1] });
        const isContributor = await crowdFund.methods
            .approvers(accounts[1])
            .call();

        assert(isContributor);
    });

    it('requires a minimum contribution', async () => {
        try {
            await crowdFund.methods.contribute().send({
                values: '90',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('allows a manager to make a payment request', async () => {
        await crowdFund.methods
            .createRequest('Buy batteries', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });

        const request = await crowdFund.methods.requests(0).call();

        assert(request.description, 'Buy batteries');
    });

    it('processes requests', async () => {
        await crowdFund.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await crowdFund.methods
            .createRequest('a', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ from: accounts[0], gas: '1000000' });

        await crowdFund.methods
            .approveRequest(0)
            .send({ from: accounts[0], gas: '1000000' });

        await crowdFund.methods
            .finalizeRequest(0)
            .send({ from: accounts[0], gas: '1000000' });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        assert(104.9 < balance);
    });
});
