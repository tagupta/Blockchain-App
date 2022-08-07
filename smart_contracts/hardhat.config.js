//https://eth-goerli.g.alchemy.com/v2/kIVbNKWhoMEVMl_wnL_P2LSdhQjNuntm
require('@nomiclabs/hardhat-waffle');
// require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/*************',
      accounts: ['000*******123************456*********789*******000'],
    },
  },
};
