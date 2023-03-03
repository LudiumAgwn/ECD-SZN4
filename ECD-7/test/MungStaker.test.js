const { time, loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { expect } = require('chai');

describe('MungStaker', function () {
  async function deployMungTokenFixture() {
    const MungToken = await ethers.getContractFactory('MungToken');
    const mungToken = await MungToken.deploy();

    const MungNFT = await ethers.getContractFactory('MungNFT');
    const mungNFT = await MungNFT.deploy();

    const MungStaker = await ethers.getContractFactory('MungStaker');
    const mungStaker = await MungStaker.deploy(mungToken.address, mungNFT.address);

    // Transfer ownership of FARM Token to the staker contract so it can mint tokens
    await mungToken.transferOwnership(mungStaker.address);

    return [mungToken, mungNFT, mungStaker];
  }

  let mungToken, mungNFT, mungStaker;
  let owner, alice;

  beforeEach(async function () {
    [mungToken, mungNFT, mungStaker] = await loadFixture(deployMungTokenFixture);
    [owner, alice] = await ethers.getSigners();
  });

  describe('Deployment', function () {
    it('should transferred the token owner to the staker contract', async function () {
      expect(await mungToken.owner()).to.equal(mungStaker.address);
    });

    it('should set the right Mung Token address', async function() {
      expect(await mungStaker.mungToken()).to.equal(mungToken.address);
    });

    it('should set the right Mung Token address', async function() {
      expect(await mungStaker.mungNFT()).to.equal(mungNFT.address);
    });

    it('should have 0 claimedCount', async function() {
      expect(await mungStaker.activeLockUpCount()).to.equal(0);
    })
  });

  describe('Lock-up', function() {
    describe('Normal flow', function() {
      beforeEach(async function() {
        await mungNFT.safeMint(alice.address);
        await mungNFT.connect(alice).approve(mungStaker.address, 0);
      });

      it('should transfer the NFT from alice to the staker contract', async function() {
        expect(await mungNFT.balanceOf(alice.address)).to.equal(1);
        await mungStaker.connect(alice).lockUp(0);
        expect(await mungNFT.balanceOf(alice.address)).to.equal(0);
      });

      it('should stored the lock-up correctly', async function() {
        await mungStaker.connect(alice).lockUp(0);
        const [lockedAt, user] = await mungStaker.tokenLockUp(0);
        expect(lockedAt).to.equal(await time.latest());
        expect(user).to.equal(alice.address);
      });

      // TODO: more test cases

      it('should emit lock-up event', async function () {
        await expect(mungStaker.connect(alice).lockUp(0))
          .emit(mungStaker, 'LockedUp')
          .withArgs(alice.address, 0);
      });
    });

    describe('Edge cases', function() {
      it('should revert if the mungToken is not approved', async function() {
        await mungNFT.safeMint(alice.address);
        await expect(mungStaker.connect(alice).lockUp(0)).to.be.revertedWith('ERC721: caller is not token owner or approved');
      });

      it('should revert if locked-up already exists', async function() {
        await mungNFT.safeMint(alice.address);
        await mungNFT.connect(alice).approve(mungStaker.address, 0);
        await mungStaker.connect(alice).lockUp(0);
        await expect(mungStaker.connect(alice).lockUp(0)).to.be.revertedWithCustomError(
          mungStaker,
          'MungStaker__LockUpAlreadyExists'
        );
      });

      // TODO: more edge cases
    });
  });

  describe('Unlock', function() {
    describe('Normal flow', function() {
      beforeEach(async function() {
        await mungNFT.safeMint(alice.address);
        await mungNFT.connect(alice).approve(mungStaker.address, 0);
        await mungStaker.connect(alice).lockUp(0);
        await time.increaseTo(await time.latest() + 600);
      });

      it('should return the lock-up amount to alice', async function() {
        await mungStaker.connect(alice).unlock(0);
        expect(await mungNFT.balanceOf(alice.address)).to.equal(1);
      });

      it('should remove the lock-up', async function() {
        expect(await mungStaker.lockUpExists(0)).to.equal(true);
        await mungStaker.connect(alice).unlock(0);
        expect(await mungStaker.lockUpExists(0)).to.equal(false);
      });

      // TODO: more test cases

      it('should emit unlocked event', async function () {
        await expect(mungStaker.connect(alice).unlock(0))
          .emit(mungStaker, 'Unlocked')
          .withArgs(alice.address, 0);
      });
    });

    describe('Edge cases', function() {
      it('should revert if the user does not have lock-up', async function() {
        await expect(mungStaker.connect(alice).unlock(0)).to.be.revertedWithCustomError(
          mungStaker,
          'MungStaker__LockUpDoesNotExists'
        );
      });

      it('should revert if the lock-up has not matured', async function() {
        await mungNFT.safeMint(alice.address);
        await mungNFT.connect(alice).approve(mungStaker.address, 0);
        await mungStaker.connect(alice).lockUp(0);
        await time.increaseTo(await time.latest() + 500); // 500 sec later
        await expect(mungStaker.connect(alice).unlock(0)).to.be.revertedWithCustomError(
          mungStaker,
          'MungStaker__LockUpHasNotMatured'
        );
      });

      // TODO: more edge cases
    });
  });
});
