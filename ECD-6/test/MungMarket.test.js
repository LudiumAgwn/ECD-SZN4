const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('MungMarket', function () {
  async function deployMungMarketFixture() {
    const MungToken = await ethers.getContractFactory('MungToken');
    const mungToken = await MungToken.deploy();

    const MungNFT = await ethers.getContractFactory('MungNFT');
    const mungNFT = await MungNFT.deploy();

    const MungMarket = await ethers.getContractFactory('MungMarket');
    const mungMarket = await MungMarket.deploy(mungToken.address, mungNFT.address);

    return [mungToken, mungNFT, mungMarket];
  }

  let mungToken, mungNFT, mungMarket;
  let owner, alice, bob;

  beforeEach(async function () {
    [mungToken, mungNFT, mungMarket] = await loadFixture(deployMungMarketFixture);
    [owner, alice, bob] = await ethers.getSigners();
  });

  describe('Deployment', function () {
    it('should have 0 listCount initially', async function () {
      expect(await mungMarket.listCount()).to.equal(0);
    });

    it('should revert array out of bound on index 0', async function () {
      await expect(mungMarket.listedItems(0)).to.be.reverted;
    });
  });

  describe('Normal flow', function () {
    beforeEach(async function() {
      await mungNFT.safeMint(alice.address); // tokenId: 0
      await mungToken.mint(bob.address, 1000);

      await mungNFT.connect(alice).approve(mungMarket.address, 0);
      await mungMarket.connect(alice).list(0, 333);
    });

    describe('List', function() {
      it('should have 1 listCount after list', async function () {
        expect(await mungMarket.listCount()).to.equal(1);
      });

      it('should set isListed to true after list', async function () {
        expect(await mungMarket.isListed(0)).to.equal(true);
      });

      it('should have listedItems on index 0', async function () {
        expect(await mungMarket.listedItems(0)).to.equal(0);
      });

      it('should set listPrice to 333 after list', async function () {
        expect(await mungMarket.itemPrices(0)).to.equal(333);
      });
    }); // List

    describe('Buy', function() {
      beforeEach(async function() {
        await mungToken.connect(bob).approve(mungMarket.address, 333);
        await mungMarket.connect(bob).buy(0, 0);
      });

      it('should have 0 listCount after buy', async function () {
        expect(await mungMarket.listCount()).to.equal(0);
      });

      it('should set isListed to false after buy', async function () {
        expect(await mungMarket.isListed(0)).to.equal(false);
      });

      it('should revert array out of bound on index 0', async function () {
        await expect(mungMarket.listedItems(0)).to.be.reverted;
      });

      it('should set listPrice to 0 after buy', async function () {
        expect(await mungMarket.itemPrices(0)).to.equal(0);
      });

      it('should transfer 333 MUNGs from bob to alice', async function () {
        expect(await mungToken.balanceOf(alice.address)).to.equal(333);
        expect(await mungToken.balanceOf(bob.address)).to.equal(667);
      });

      it('should transfer NFT from alice to bob', async function () {
        expect(await mungNFT.ownerOf(0)).to.equal(bob.address);
      });
    }); // Buy

    describe('DeList', function() {
      beforeEach(async function() {
        await mungMarket.connect(alice).deList(0);
      });

      it('should have 0 listCount after deList', async function () {
        expect(await mungMarket.listCount()).to.equal(0);
      });

      it('should set isListed to false after deList', async function () {
        expect(await mungMarket.isListed(0)).to.equal(false);
      });

      it('should revert array out of bound on index 0', async function () {
        await expect(mungMarket.listedItems(0)).to.be.reverted;
      });

      it('should set listPrice to 0 after deList', async function () {
        expect(await mungMarket.itemPrices(0)).to.equal(0);
      });
    }); // DeList
  });

  describe('Edge cases', function () {
    it('should revert if NFT is not approved', async function () {
      await mungNFT.safeMint(alice.address); // tokenId: 0
      await expect(mungMarket.connect(alice).list(0, 333)).to.be.revertedWithCustomError(
        mungMarket,
        'MungMarket__NotApproved'
      );
    });

    it('should revert if listPrice is 0', async function () {
      await mungNFT.safeMint(alice.address); // tokenId: 0
      await mungNFT.connect(alice).approve(mungMarket.address, 0);
      await expect(mungMarket.connect(alice).list(0, 0)).to.be.revertedWithCustomError(
        mungMarket,
        'MungMarket__InvalidPrice'
      );
    });

    it('should revert if NFT is not owned by sender', async function () {
      await mungNFT.safeMint(alice.address); // tokenId: 0
      await mungNFT.connect(alice).approve(mungMarket.address, 0);
      await expect(mungMarket.connect(bob).list(0, 333)).to.be.revertedWithCustomError(
        mungMarket,
        'MungMarket__PermissionDenied'
      );
    });

    it('should revert if NFT is already listed', async function () {
      await mungNFT.safeMint(alice.address); // tokenId: 0
      await mungNFT.connect(alice).approve(mungMarket.address, 0);
      await mungMarket.connect(alice).list(0, 333);
      await expect(mungMarket.connect(alice).list(0, 333)).to.be.revertedWithCustomError(
        mungMarket,
        'MungMarket__AlreadyListed'
      );
    });

    // TODO: More edge cases
  });
});
