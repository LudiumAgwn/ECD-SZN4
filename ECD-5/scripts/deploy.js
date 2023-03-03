const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const deployer = accounts[0].address;
  console.log(`Deploy from account: ${deployer}`);

  const MungToken = await hre.ethers.getContractFactory('MungToken');
  const mungToken = await MungToken.deploy();
  await mungToken.deployed();
  console.log(` -> MungToken contract deployed at ${mungToken.address}`);

  const MungAirdrop = await hre.ethers.getContractFactory('MungAirdrop');
  const mungAirdrop = await MungAirdrop.deploy(mungToken.address);
  await mungAirdrop.deployed();
  console.log(` -> MungAirdrop contract deployed at ${mungAirdrop.address}`);

  console.log(`\n\nNetwork: ${hre.network.name}`);
  console.log('```');
  console.log(`- MungToken: ${mungToken.address}`);
  console.log(`- MungAirdrop: ${mungAirdrop.address}`);
  console.log('```');

  console.log(`
    npx hardhat verify --network ${hre.network.name} ${mungToken.address}
    npx hardhat verify --network ${hre.network.name} ${mungAirdrop.address} '${mungToken.address}'
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
