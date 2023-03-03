// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/** @dev
 * This market contract has very limited functionality intended for practice purposes.
 * - Only MungNFTs can be listed
 * - The NFTs can only be traded using MungToken
 */
contract MungMarket {
    error MungMarket__NotApproved();
    error MungMarket__AlreadyListed();
    error MungMarket__NotListed();
    error MungMarket__InvalidPrice();
    error MungMarket__InvalidParams();
    error MungMarket__PermissionDenied();

    // Base token
    IERC20 public mungToken;
    IERC721 public mungNFT;

    mapping(uint256 => uint256) public itemPrices; // tokenId => price
    uint256[] public listedItems; // listIndex => tokenId

    event List(uint256 indexed tokenId, uint256 price, address indexed seller);
    event DeList(uint256 indexed tokenId);
    event Buy(uint256 indexed tokenId, uint256 price, address indexed seller, address indexed buyer);

    constructor(address mungToken_, address mungNFT_) {
        mungToken = IERC20(mungToken_);
        mungNFT = IERC721(mungNFT_);
    }

    // Pre-condition: The NFT should be approved to this contract address
    function list(uint256 tokenId, uint256 price) external {
        if (price == 0) revert MungMarket__InvalidPrice();
        if (mungNFT.ownerOf(tokenId) != msg.sender) revert MungMarket__PermissionDenied();
        if (mungNFT.getApproved(tokenId) != address(this)) revert MungMarket__NotApproved();
        if (isListed(tokenId)) revert MungMarket__AlreadyListed();

        itemPrices[tokenId] = price;
        listedItems.push(tokenId);

        emit List(tokenId, price, msg.sender);
    }

    function deList(uint256 listIndex) external {
        if (listIndex >= listedItems.length) revert MungMarket__InvalidParams();
        uint256 tokenId = listedItems[listIndex];
        if (!isListed(tokenId)) revert MungMarket__NotListed();
        if (mungNFT.ownerOf(tokenId) != msg.sender) revert MungMarket__PermissionDenied();

        _removeListedItem(listIndex);

        emit DeList(tokenId);
    }

    // Pre-condition: MungToken should be approved to this contract address
    function buy(uint256 tokenId, uint256 listIndex) external {
        if (listIndex >= listedItems.length) revert MungMarket__InvalidParams();
        if (listedItems[listIndex] != tokenId) revert MungMarket__InvalidParams();
        if (!isListed(tokenId)) revert MungMarket__NotListed();

        address seller = mungNFT.ownerOf(tokenId);
        address buyer = msg.sender;
        uint256 price = itemPrices[tokenId];

        _removeListedItem(listIndex);

        mungToken.transferFrom(buyer, seller, price); // Send MungToken to the seller
        mungNFT.transferFrom(seller, buyer, tokenId); // Send MungNFT to the buyer

        // NOTE: Loyalties and market fees can be implemented here

        emit Buy(tokenId, price, seller, buyer);
    }

    function _removeListedItem(uint256 listIndex) private {
        uint256 tokenId = listedItems[listIndex];

        // NOTE: This changes the list index ramdomly
        // We may need to save additional data (e.g. listedAt) in order to sort it properly
        listedItems[listIndex] = listedItems[listedItems.length - 1];
        listedItems.pop();

        itemPrices[tokenId] = 0;
    }

    function isListed(uint256 tokenId) public view returns (bool) {
        return itemPrices[tokenId] > 0;
    }

    function listCount() external view returns (uint256) {
        return listedItems.length;
    }
}