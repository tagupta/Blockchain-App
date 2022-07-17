// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
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

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
