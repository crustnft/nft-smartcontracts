import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractFactory, Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("EnumerableOwnable", function () {
  let Collection: ContractFactory;
  let collection: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    Collection = await ethers.getContractFactory("EnumerableOwnable");
    collection = await Collection.deploy();
    await collection.deployed();
  });

  describe("Token Info", function () {
    it("Should have the right owner", async function () {
      expect(await collection.owner()).to.equal(owner.address);
    });
    it("Should have the right name", async function () {
      expect(await collection.name()).to.equal("Name");
    });
    it("Should have the right symbol", async function () {
      expect(await collection.symbol()).to.equal("SYMBOL");
    });
  });

  describe("Minting token", function () {
    it("Owner can mint a token", async function () {
      await collection
        .connect(owner)
        .mint(
          "https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
        );
      expect(await collection.balanceOf(owner.address)).to.equal(1);
      expect(await collection.tokenURI(1)).to.equal(
        "https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
      );
    });
  });
});
