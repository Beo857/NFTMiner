const { ethers } = require("ethers");

async function deploy() {
  // Connect to the provider
  const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com");

  // Set up the signer
  const privateKey = "YOUR_PRIVATE_KEY"; // Replace with your private key
  const wallet = new ethers.Wallet(privateKey, provider);

  // Set up the contract factory
  const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

  // Deploy the contract
  const contract = await contractFactory.deploy();

  // Wait for the contract to be mined and get the deployment transaction receipt
  const receipt = await contract.deployed();

  console.log("Contract deployed successfully!");
  console.log("Contract address:", contract.address);
}

deploy();
