const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
require("dotenv").config();

const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "bike rabbit shadow battle suit float rather ride divorce humor wasp aisle",
  "https://goerli.infura.io/v3/010e283b478143a79ba5a931b878fda0"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(compiledFactory.abi);

  result
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "30000000" })
    .then((deployment) => {
      console.log("Contract was successfully deployed by:", accounts[0]);
      console.log("Contract is deployed to ", deployment.options.address);
    })
    .catch((err) => {
      console.log(err);
    });

  provider.engine.stop();
};

deploy();
