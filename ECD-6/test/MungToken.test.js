const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('MungToken', function () {
  async function deployMungTokenFixture() {
    const MungToken = await ethers.getContractFactory('MungToken');
    const mungToken = await MungToken.deploy();

    return mungToken;
  }

  let mungToken;
  let owner, alice;

  beforeEach(async function () {
    mungToken = await loadFixture(deployMungTokenFixture);
    [owner, alice] = await ethers.getSigners();
  });

  describe('Deployment', function () {
    it('should set the right owner', async function () {
      expect(await mungToken.owner()).to.equal(owner.address);
    });

    it('should have 0 total supply initially', async function () {
      expect(await mungToken.totalSupply()).to.equal(0);
    });
  });

  describe('Mintable', function() {
    it('should mint to the receiver', async function() {
      await mungToken.mint(alice.address, 100);
      expect(await mungToken.balanceOf(alice.address)).to.equal(100);
    });

    it('should revert minting if not owner', async function() {
      await expect(mungToken.connect(alice).mint(alice.address, 123)).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });
});
