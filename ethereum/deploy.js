const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "12 word mneumonic",
  "Infura link"
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
