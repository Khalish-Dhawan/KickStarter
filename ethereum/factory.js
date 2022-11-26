const campaignFactory = require("./build/CampaignFactory.json");
const web3 = require("./web3");

module.exports = new web3.eth.Contract(
  campaignFactory.abi,
  "Deployed Address of factory obtained after deployment"
);
