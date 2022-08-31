const Web3 = require("web3");

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/1d01e94d5f5447f0953b2d88afc9d9d7"
  );
  web3 = new Web3(provider);
}

module.exports = web3;
