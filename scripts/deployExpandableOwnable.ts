import { ethers } from "hardhat";

async function main() {
  const Collection = await ethers.getContractFactory("EnumerableOwnable");
  const collection = await Collection.deploy();

  await collection.deployed();

  console.log("collection deployed to:", collection.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
