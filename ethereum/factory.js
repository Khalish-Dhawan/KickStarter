const campaignFactory = require("./build/CampaignFactory.json");
const web3 = require("./web3");

module.exports = new web3.eth.Contract(
  campaignFactory.abi,
  "0xC64Af0bB0f5Af77aA0c8Ea40fa9514c871A1d0bb"
);
