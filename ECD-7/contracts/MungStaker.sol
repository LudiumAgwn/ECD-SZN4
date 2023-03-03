// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IMungToken.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

/** @dev
 * This is a practice exercise for a simple staking contract.
 * Users can lock up MungNFT for 10 minutes to receive 100 MungTokens.
 */

contract MungStaker {
  error MungStaker__LockUpAlreadyExists();
  error MungStaker__LockUpDoesNotExists();
  error MungStaker__LockUpHasNotMatured();

  IMungToken public mungToken; // Token to be staked
  IERC721 public mungNFT; // Token to be farmed

  uint256 public constant LOCK_UP_DURATION = 600; // 10 minutes
  uint256 public constant FARMING_AMOUNT = 100 * 10**18; // 100 MUNG

  // Gas saving
  // REF: https://medium.com/@novablitz/774da988895e
  struct LockUp {
    uint40 lockedAt;
    address user; // 160 bits
  }

  mapping (uint256 => LockUp) public tokenLockUp;

  uint256 public activeLockUpCount;

  event LockedUp(address indexed user, uint256 tokenId);
  event Unlocked(address indexed user, uint256 tokenId);

  constructor(address mungToken_, address mungNFT_) {
    mungToken = IMungToken(mungToken_); // must have the ownership
    mungNFT = IERC721(mungNFT_);
  }

  function lockUp(uint256 tokenId) external {
    LockUp storage lock = tokenLockUp[tokenId];
    if (lock.lockedAt > 0) revert MungStaker__LockUpAlreadyExists();

    mungNFT.transferFrom(msg.sender, address(this), tokenId);

    lock.lockedAt = uint40(block.timestamp);
    lock.user = msg.sender;
    activeLockUpCount += 1;

    emit LockedUp(msg.sender, tokenId);
  }

  function unlock(uint256 tokenId) external {
    LockUp storage lock = tokenLockUp[tokenId];

    if (lock.lockedAt == 0) revert MungStaker__LockUpDoesNotExists();
    if (lock.lockedAt + LOCK_UP_DURATION >= block.timestamp) revert MungStaker__LockUpHasNotMatured();

    lock.lockedAt = 0;
    lock.user = address(0);
    activeLockUpCount -= 1;

    mungNFT.transferFrom(address(this), msg.sender, tokenId);
    // Distribute farming tokens to the staker, 10% of the MUNG token lock-up tokenId
    mungToken.mint(msg.sender, FARMING_AMOUNT);

    emit Unlocked(msg.sender, tokenId);
  }

  function lockUpExists(uint256 tokenId) external view returns(bool) {
    return tokenLockUp[tokenId].lockedAt > 0;
  }
}
