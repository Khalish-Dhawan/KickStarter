const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
require("dotenv").config();

const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "bike rabbit shadow battle suit float rather ride divorce humor wasp aisle",
  "https://rinkeby.infura.io/v3/1d01e94d5f5447f0953b2d88afc9d9d7"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "10000000" });

  console.log("Contract deployed to ", result.options.address);
  provider.engine.stop();
};

deploy();
