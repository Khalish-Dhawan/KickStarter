const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

let web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign = require("../ethereum/build/Campaign.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: "1000000000" });

  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000000",
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

  campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe("Campaigns", () => {
  it("deploys a factory and campaign", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as the campaign manager", async () => {
    let managerAccount = await campaign.methods.manager().call();
    assert.equal(managerAccount, accounts[0]);
  });

  it("allows people to contribute money and mark them as approvers", async () => {
    await campaign.methods.Contribute().send({
      from: accounts[1],
      value: "200",
    });

    const isApprover = await campaign.methods.approvers(accounts[1]).call();
    assert(isApprover);
  });

  it("requires a minimum contribution", async () => {
    try {
      await campaign.methods.Contribute().send({
        from: accounts[1],
        value: "50",
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("processes requests", async () => {
    await campaign.methods.Contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });

    await campaign.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "90000000",
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "90000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "90000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    assert(balance > 104);
  });
});
