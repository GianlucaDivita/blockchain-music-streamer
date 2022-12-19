const hre = require("hardhat");

async function main() {
  const Platform = await hre.ethers.getContractFactory("Platform");
  const platform = await Platform.deploy();

  await platform.deployed();

  console.log(`Platform deployed to ${platform.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
