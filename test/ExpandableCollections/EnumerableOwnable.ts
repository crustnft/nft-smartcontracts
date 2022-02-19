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

    it("Owner can mint two tokens", async function () {
      await collection.connect(owner).mint("https://ipfs.io/ipfs/abc");
      expect(await collection.balanceOf(owner.address)).to.equal(2);
      expect(await collection.tokenURI(2)).to.equal("https://ipfs.io/ipfs/abc");
    });

    it("Inviter can't mint NFT", async function () {
      await expect(
        collection.connect(addr1).mint("https://dummy.com")
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Transferring token", function () {
    it("Owner can transfer a token", async function () {
      await collection
        .connect(owner)
        ["safeTransferFrom(address,address,uint256)"](
          owner.address,
          addr1.address,
          1
        );
    });

    it("Check sender balance", async function () {
      expect(await collection.balanceOf(owner.address)).to.equal(1);
    });

    it("Check receiver balance", async function () {
      expect(await collection.balanceOf(addr1.address)).to.equal(1);
    });

    it("Receiver send token", async function () {
      await collection
        .connect(addr1)
        ["safeTransferFrom(address,address,uint256)"](
          addr1.address,
          addr2.address,
          1
        );
      expect(await collection.balanceOf(addr1.address)).to.equal(0);
      expect(await collection.balanceOf(addr2.address)).to.equal(1);
      await collection
        .connect(addr2)
        ["safeTransferFrom(address,address,uint256)"](
          addr2.address,
          owner.address,
          1
        );
      expect(await collection.balanceOf(addr2.address)).to.equal(0);
      expect(await collection.balanceOf(owner.address)).to.equal(2);
    });

    it("Owner send non existing token", async function () {
      await expect(
        collection
          .connect(owner)
          ["safeTransferFrom(address,address,uint256)"](
            owner.address,
            addr1.address,
            5
          )
      ).to.be.revertedWith("ERC721: operator query for nonexistent token");
    });

    it("Owner send someone's token", async function () {
      await collection
        .connect(owner)
        ["safeTransferFrom(address,address,uint256)"](
          owner.address,
          addr1.address,
          1
        );
      await expect(
        collection
          .connect(owner)
          ["safeTransferFrom(address,address,uint256)"](
            addr1.address,
            addr2.address,
            1
          )
      ).to.be.revertedWith("ERC721: transfer caller is not owner nor approved");
    });
  });
});
