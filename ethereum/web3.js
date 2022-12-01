const Web3 = require("web3");

let web3;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // we are in the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider);
} else {
  // we are on the server OR the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/010e283b478143a79ba5a931b878fda0"
  );
  web3 = new Web3(provider);
}

module.exports = web3;
