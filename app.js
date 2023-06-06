const walletAddress = prompt("Enter your wallet address:");
const contractAddress = "0x43fb710c955D7c96C9F7906E79d6D1DEB5b19107"; // Replace with your deployed NFTMiner contract address
const contractAddress = "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"; // Replace with your deployed NFTMiner contract address
const contractAddress = "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"; // Replace with your deployed NFTMiner contract address
const contractAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"; // Replace with your deployed NFTMiner contract address
const contractAddress = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff"; // Replace with your deployed NFTMiner contract address
const contractAddress = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"; // Replace with your deployed NFTMiner contract address
const contractAddress = "0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf"; // Replace with your deployed NFTMiner contract address
const contractAddress = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"; // Replace with your deployed NFTMiner contract address
const provider = ethers.getDefaultProvider("https://polygon-rpc.com");

const contractABI = [
    // Add the ABI of your deployed NFTMiner contract here
    [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const signer = provider.getSigner();

document.getElementById("mineButton").addEventListener("click", mine);
document.getElementById("mintButton").addEventListener("click", mint);
document.getElementById("purchaseButton").addEventListener("click", purchase);

async function mine() {
    const minedTx = await contract.connect(signer).mine();
    await minedTx.wait();
    alert("Mining completed!");
}

async function mint() {
    const mintTx = await contract.connect(signer).createRandomAvenger("Avenger Name");
    await mintTx.wait();
    alert("Avenger NFT minted!");
}

async function purchase() {
    const avengerId = prompt("Enter the Avenger ID to purchase:");
    const purchaseTx = await contract.connect(signer).purchaseAvenger(avengerId, { value: ethers.utils.parseEther("0.5") });
    await purchaseTx.wait();
    alert("Avenger NFT purchased!");
}
