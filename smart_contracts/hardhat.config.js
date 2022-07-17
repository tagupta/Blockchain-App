//https://eth-goerli.g.alchemy.com/v2/kIVbNKWhoMEVMl_wnL_P2LSdhQjNuntm
require('@nomiclabs/hardhat-waffle');
// require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/kIVbNKWhoMEVMl_wnL_P2LSdhQjNuntm',
      accounts: ['2de072b236cd4ae4b3f14aeb75efd9ff4c73dd1c8884472da184bf20a4568614'],
    },
  },
};