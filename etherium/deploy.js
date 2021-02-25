const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require('./build/CampaignFactory.json')

const mnemonic = "pottery entry media urge clip power knock onion destroy twice march inhale";
const infuraAPI = "https://rinkeby.infura.io/v3/29e6e58500b3459790e84d8107ab63ee";

const provider = new HDWalletProvider(mnemonic , infuraAPI);

const web3 = new Web3(provider)

const deploy = async () => {
    accounts = await web3.eth.getAccounts();

    console.log("attempting to deploy with account : ", accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from : accounts[0] , gas: 1000000 });

    console.log("have been deployed to address : ", result.options.address);
}

deploy();
