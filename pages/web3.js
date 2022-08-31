import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running

  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the next server OR user is not running metamask

  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/1d01e94d5f5447f0953b2d88afc9d9d7"
  );

  web3 = new Web3(provider);
}

export default web3;
