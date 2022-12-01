const campaignFactory = require("./build/CampaignFactory.json");
const web3 = require("./web3");

module.exports = new web3.eth.Contract(
  campaignFactory.abi,
  "0x8224bB2295852F98BffEd4011584E178B91811a7"
);
