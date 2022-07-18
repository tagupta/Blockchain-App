const { expect } = require("chai");

describe("Transaction", function () {


  describe("AddToBlockchain", function () {
    it("Should add transaction to the blockchain", async function () {
      const [owner, account_2] = await ethers.getSigners();
      const Transactions = await ethers.getContractFactory("Transactions");
      const transactions = await Transactions.deploy();

      const oldBalance_Owner = await ethers.provider.getBalance(owner.address);
      const oldBalance_Account_2 = await ethers.provider.getBalance(account_2.address);
      console.log("Owner: ", owner.address);
      console.log('Account 2: ', account_2.address);
      console.log("Owner Balance:", oldBalance_Owner);
      console.log("Account_2 Balance: ", oldBalance_Account_2);

      await transactions.connect(account_2).addToBlockchain(owner.address, "Hello World!!", "hello", { value: ethers.utils.parseEther("2") });
      const newBalance_Owner = await ethers.provider.getBalance(owner.address);
      const newBalance_Account_2 = await ethers.provider.getBalance(account_2.address);

      console.log("oldBalance_Owner", oldBalance_Owner);
      console.log("oldBalance_Account_2", oldBalance_Account_2);
      console.log("newBalance_Owner", newBalance_Owner);
      console.log("newBalance_Account_2", newBalance_Account_2);

    });

  });

});
