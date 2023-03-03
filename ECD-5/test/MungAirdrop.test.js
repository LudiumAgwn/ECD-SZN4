const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('MungAirdrop', function () {
  async function deployMungTokenFixture() {
    const MungToken = await ethers.getContractFactory('MungToken');
    const mungToken = await MungToken.deploy();

    const MungAirdrop = await ethers.getContractFactory('MungAirdrop');
    const mungAirdrop = await MungAirdrop.deploy(mungToken.address);

    // Transfer ownership of Mung Token to the airdrop contract so it can mint tokens
    await mungToken.transferOwnership(mungAirdrop.address);

    return [mungToken, mungAirdrop];
  }

  let mungToken, mungAirdrop;
  let owner, alice;

  beforeEach(async function () {
    [mungToken, mungAirdrop] = await loadFixture(deployMungTokenFixture);
    [owner, alice] = await ethers.getSigners();
  });

  describe('Deployment', function () {
    it('should transferred the token owner to the airdrop contract', async function () {
      expect(await mungToken.owner()).to.equal(mungAirdrop.address);
    });

    it('should set the right Mung Token address', async function() {
      expect(await mungAirdrop.mungToken()).to.equal(mungToken.address);
    });

    it('should have 0 claimedCount', async function() {
      expect(await mungAirdrop.claimedCount()).to.equal(0);
    })
  });

  describe('Airdrop', function() {
    beforeEach(async function() {
      this.AIRDROP_AMOUNT = await mungAirdrop.AIRDROP_AMOUNT();
      await mungAirdrop.connect(alice).airdrop();
    });

    it('should airdrop the correct amount to the message sender', async function() {
      expect(await mungToken.balanceOf(alice.address)).to.equal(this.AIRDROP_AMOUNT);
    });

    it('should set the state to be claimed', async function() {
      expect(await mungAirdrop.hasClaimed(alice.address)).to.equal(true);
    });

    it('should not set the state to be claimed if not claimed', async function() {
      expect(await mungAirdrop.hasClaimed(owner.address)).to.equal(false);
    });

    it('should increase the airdrop count', async function() {
      expect(await mungAirdrop.claimedCount()).to.equal(1);
    });

    it('should increase the total claimed amount', async function() {
      expect(await mungAirdrop.totalClaimed()).to.equal(this.AIRDROP_AMOUNT);
    });

    it('should revert if the same user try to claim again', async function() {
      await expect(mungAirdrop.connect(alice).airdrop()).to.be.revertedWithCustomError(
        mungAirdrop,
        'MungAirdrop__AlreadyClaimed'
      );
    });

    it('should emit Airdrop event', async function () {
        await expect(mungAirdrop.airdrop())
          .emit(mungAirdrop, 'Airdrop')
          .withArgs(owner.address, this.AIRDROP_AMOUNT);
      });
  });
});
