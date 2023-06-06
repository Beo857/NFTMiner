const walletAddress = prompt("Enter your wallet address:");
const contractAddress = "0x43fb710c955D7c96C9F7906E79d6D1DEB5b19107"; // Replace with your deployed NFTMiner contract address
const provider = new ethers.providers.Web3Provider(window.ethereum);

const contractABI = [
  // Add the ABI of your deployed NFTMiner contract here
  // ...
 {"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},
    {"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},
    {"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Paused","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Unpaused","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},
    {"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}
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
  const avengerName = prompt("Enter the Avenger name:");
  const avengerImageURL = "https://www.bing.com/images/search?view=detailV2&ccid=2wvqg2DD&id=0224E7679875DBD870A94B37122E7722DE104DE9&thid=OIP.2wvqg2DDNkruDB9nmWuUPgHaFv&mediaurl=https%3a%2f%2fwww.spriters-resource.com%2fresources%2fsheets%2f51%2f54505.png%3fupdated%3d1460960528&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.db0bea8360c3364aee0c1f67996b943e%3frik%3d6U0Q3iJ3LhI3Sw%26pid%3dImgRaw%26r%3d0&exph=1550&expw=2000&q=https%3a%2f%2fbeo857.github.in%2fNFTminer%2f+avenger+3d+stock+sprites+png&simid=608011608347722047&FORM=IRPRST&ck=6C75B51C4D783EBFB1958F4ADBF58AC0&selectedIndex=0&ajaxhist=0&ajaxserp=0";
  const mintTx = await contract.connect(signer).createRandomAvenger(avengerName, avengerImageURL);
  await mintTx.wait();
  alert("Avenger NFT minted!");
}

async function purchase() {
  const avengerId = prompt("Enter the Avenger ID to purchase:");
  const purchaseTx = await contract.connect(signer).purchaseAvenger(avengerId, { value: ethers.utils.parseEther("0.5") });
  await purchaseTx.wait();
  alert("Avenger NFT purchased!");
}

async function queryAvengers() {
  const totalAvengers = await contract.totalSupply();

  for (let i = 0; i < totalAvengers; i++) {
    const avenger = await contract.getAvenger(i);
    const avengerId = avenger[0].toNumber();
    const avengerName = avenger[1];
    const avengerImageURL = avenger[2];
    // Create an HTML element to display the Avenger details
    const avengerElement = document.createElement("div");
    avengerElement.innerHTML = `
      <p>Avenger ID: ${avengerId}</p>
      <p>Avenger Name: ${avengerName}</p>
      <img src="${avengerImageURL}" alt="Avenger Image">
    `;
    // Append the Avenger element to a container
    document.getElementById("avengerContainer").appendChild(avengerElement);
  }
}

queryAvengers();