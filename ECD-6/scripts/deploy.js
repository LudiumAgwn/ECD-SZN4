const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0].address;
  console.log(`Deploy from account: ${deployer}`);

  const MungToken = await hre.ethers.getContractFactory('MungToken');
  const mungToken = await MungToken.deploy();
  await mungToken.deployed();
  console.log(` -> MungToken contract deployed at ${mungToken.address}`);

  const MungNFT = await hre.ethers.getContractFactory('MungNFT');
  const mungNFT = await MungNFT.deploy();
  await mungNFT.deployed();
  console.log(` -> MungNFT contract deployed at ${mungNFT.address}`);

  const MungMarket = await hre.ethers.getContractFactory('MungMarket');
  const mungMarket = await MungMarket.deploy(mungToken.address, mungNFT.address);
  await mungMarket.deployed();
  console.log(` -> MungMarket contract deployed at ${mungMarket.address}`);

  console.log(`\n\nNetwork: ${hre.network.name}`);
  console.log('```');
  console.log(`- MungToken: ${mungToken.address}`);
  console.log(`- MungNFT: ${mungNFT.address}`);
  console.log(`- MungMarket: ${mungMarket.address}`);
  console.log('```');

  console.log(`
    npx hardhat verify --network ${hre.network.name} ${mungToken.address}
    npx hardhat verify --network ${hre.network.name} ${mungNFT.address}
    npx hardhat verify --network ${hre.network.name} ${mungMarket.address} '${mungToken.address}' '${mungNFT.address}'
  `);
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });


/* Deploy script

npx hardhat compile && npx hardhat run --network goerli scripts/deploy.js

*/
