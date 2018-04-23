const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CrowdFundFactory.json');

const { accountMnemonic, infuraApiKey } = require('./settings.json');

const network = 'rinkeby';

const INFURA_API_URL = `https://${network}.infura.io/${infuraApiKey}`;

const provider = new HDWalletProvider(accountMnemonic, INFURA_API_URL);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(`Fetched accounts: ${accounts}`);

    const result = await new web3.eth.Contract(
        JSON.parse(compiledFactory.interface)
    )
        .deploy({
            data: compiledFactory.bytecode
        })
        .send({ gas: '1000000', from: accounts[0] });

    console.log(`Crowd Fund Factory address is ${result.options.address}`);
};

deploy();
