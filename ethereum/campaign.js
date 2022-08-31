import web3 from "./web3";
import Campaign from "./build/Campaign.json";

function campaign(address) {
  const instance = new web3.eth.Contract(Campaign.abi, address);

  return instance;
}

export default campaign;
