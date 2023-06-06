// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./IERC20.sol";

contract NFTMiner {
    address payable public walletAddress;
    uint256 public lastMiningTimestamp;
    uint256 public miningRate = 250000000000000000; // 0.25 Matic

    address public avengerContractAddress;
    uint256 public contractMiningRate = miningRate * 1250; // 1250% of mining rate

    Avengers public avengerContract;

    uint256 public nftDigits = 8;
    uint256 public nftModulus = 4**nftDigits;
    uint256 public nftPrice = 500000000000000000; // 0.50 Matic

    event NewAvenger(uint256 id, string name, uint256 dna);
    event AvengerPurchased(uint256 id, string name, address buyer);

    constructor(address payable _walletAddress, address _avengerContractAddress) public {
        walletAddress = _walletAddress;
        avengerContractAddress = _avengerContractAddress;
        lastMiningTimestamp = block.timestamp;
        avengerContract = Avengers(_avengerContractAddress);
    }

    function mine() external {
        require(block.timestamp > lastMiningTimestamp, "Miner: Cannot mine yet");

        uint256 elapsedTime = block.timestamp - lastMiningTimestamp;
        uint256 minedAmount = (elapsedTime * miningRate) / 1 minutes;
        uint256 contractMiningAmount = (elapsedTime * contractMiningRate) / 1 minutes;

        lastMiningTimestamp = block.timestamp;

        address maticTokenAddress = 0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0;
        address quickTokenAddress = 0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619;
        address maticEthLPAddress = 0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff;
        address polyDogLPAddress = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
        address polyPupLPAddress = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;
        address dogeLPAddress = 0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf;
        address btcLPAddress = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

        IERC20(maticTokenAddress).transfer(walletAddress, minedAmount);
        IERC20(maticTokenAddress).transfer(address(avengerContract), contractMiningAmount);
        IERC20(quickTokenAddress).transfer(walletAddress, minedAmount);
        IERC20(quickTokenAddress).transfer(address(avengerContract), contractMiningAmount);
        IERC20(maticEthLPAddress).transfer(walletAddress, minedAmount);
        IERC20(maticEthLPAddress).transfer(address(avengerContract), contractMiningAmount);
        IERC20(polyDogLPAddress).transfer(walletAddress, minedAmount);
        IERC20(polyDogLPAddress).transfer(address(avengerContract), contractMiningAmount);
        IERC20(polyPupLPAddress).transfer(walletAddress, minedAmount);
        IERC20(polyPupLPAddress).transfer(address(avengerContract), contractMiningAmount);
        IERC20(dogeLPAddress).transfer(walletAddress, minedAmount);
        IERC20(dogeLPAddress).transfer(address(avengerContract), contractMiningAmount);
        IERC20(btcLPAddress).transfer(walletAddress, minedAmount);
        IERC20(btcLPAddress).transfer(address(avengerContract), contractMiningAmount);
    }

    function purchaseAvenger(uint256 _avengerId) external payable {
        require(_avengerId < avengerContract.getAvengersLength(), "NFT: Invalid Avenger ID");
        require(msg.value == nftPrice, "NFT: Incorrect payment amount");

        address owner = avengerContract.avengerToOwner(_avengerId);
        require(owner != address(0), "NFT: Avenger does not exist");

        avengerContract.transferAvenger(_avengerId, msg.sender);

        emit AvengerPurchased(_avengerId, avengerContract.getAvengerName(_avengerId), msg.sender);
    }

    function withdrawBalance() external {
        require(msg.sender == walletAddress, "Miner: Only wallet owner can withdraw");
        walletAddress.transfer(address(this).balance);
    }
}

contract Avengers {
    struct Avenger {
        string name;
        uint256 dna;
    }

    Avenger[] public avengers;
    mapping(uint256 => address) public avengerToOwner;
    mapping(address => uint256) public ownerAvengersCount;

    uint256 public nftDigits = 8;
    uint256 public nftModulus = 4**nftDigits;
    uint256 public nftPrice = 500000000000000000; // 0.50 Matic

    event NewAvenger(uint256 id, string name, uint256 dna);
    event AvengerTransferred(uint256 id, address from, address to);

    function _createAvenger(string memory _name, uint256 _dna) internal {
        uint256 id = avengers.length;
        avengers.push(Avenger(_name, _dna));
        avengerToOwner[id] = msg.sender;
        ownerAvengersCount[msg.sender]++;
        emit NewAvenger(id, _name, _dna);
    }

    function transferAvenger(uint256 _avengerId, address _to) external {
        require(_avengerId < avengers.length, "NFT: Invalid Avenger ID");
        require(avengerToOwner[_avengerId] == msg.sender, "NFT: Sender is not the owner");

        avengerToOwner[_avengerId] = _to;
        ownerAvengersCount[msg.sender]--;
        ownerAvengersCount[_to]++;

        emit AvengerTransferred(_avengerId, msg.sender, _to);
    }

    function getAvengerName(uint256 _avengerId) external view returns (string memory) {
        require(_avengerId < avengers.length, "NFT: Invalid Avenger ID");
        return avengers[_avengerId].name;
    }

    function getAvengersLength() external view returns (uint256) {
        return avengers.length;
    }

    function _generateRandomDna(string memory _str) internal view returns (uint256) {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % nftModulus;
    }

    function createRandomAvenger(string memory _name) public {
        require(ownerAvengersCount[msg.sender] == 0, "NFT: Only one Avenger per address");
        uint256 randDna = _generateRandomDna(_name);
        _createAvenger(_name, randDna);
    }
}
