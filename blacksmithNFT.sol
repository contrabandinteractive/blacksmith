// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@5.0.0/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts@5.0.0/access/Ownable.sol";

contract BlacksmithNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    // Royalty percentage
    uint256 public constant ROYALTY_PERCENTAGE = 5;

    // Mapping to store the original owner of each token
    mapping(uint256 => address) private _originalOwners;

    constructor(address initialOwner) ERC721("BlacksmithNFT", "BSNFT") Ownable(initialOwner) {}

    function safeMint(address to, uint256 tokenId, string memory uri) public onlyOwner {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _originalOwners[tokenId] = to;
    }


    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function transfer(address from, address to, uint256 tokenId) internal {
        address originalOwner = _originalOwners[tokenId];
        if (originalOwner != address(0) && originalOwner != from) {
            uint256 royaltyAmount = msg.value * ROYALTY_PERCENTAGE / 100;
            payable(originalOwner).transfer(royaltyAmount);
            uint256 remainingAmount = msg.value - royaltyAmount;
            payable(from).transfer(remainingAmount);
        }
        super._transfer(from, to, tokenId);
    }
}