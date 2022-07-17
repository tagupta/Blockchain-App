
const hre = require("hardhat");

const main = async () => {

  const Transations = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transations.deploy();

  await transactions.deployed();

  console.log("Transations deployed to:", transactions.address);
}

const runMain = async () => {
  try {
    await main();
    process.exitCode = 0;
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
runMain();