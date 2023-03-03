// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./IMungToken.sol";

contract MungAirdrop {
  error MungAirdrop__AlreadyClaimed();

  IMungToken public mungToken;

  uint256 public constant AIRDROP_AMOUNT = 100 * 1e18; // 100 token per wallet

  mapping (address => bool) private claimedWallet; // To prevent multiple claims
  uint256 public claimedCount; // total airdrop claimed count

  event Airdrop(address indexed to, uint256 amount);

  constructor(address mungToken_) {
    // NOTE: must transfer ownership of mungToken to enable airdrop function
    mungToken = IMungToken(mungToken_);
  }

  function airdrop() external {
    // Each wallet can only claim once
    if (claimedWallet[msg.sender]) revert MungAirdrop__AlreadyClaimed();

    claimedWallet[msg.sender] = true;
    claimedCount += 1;

    mungToken.mint(msg.sender, AIRDROP_AMOUNT);

    emit Airdrop(msg.sender, AIRDROP_AMOUNT);
  }

  function hasClaimed(address wallet) external view returns (bool) {
    return claimedWallet[wallet];
  }

  function totalClaimed() external view returns (uint256) {
    return claimedCount * AIRDROP_AMOUNT;
  }
}