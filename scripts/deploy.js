const hre = require("hardhat");

async function sleep(ms){
  return new Promise((resolve)=>{
    setTimeout(resolve,ms)
  })
}

async function main() {
  
  const whitelistContract = await hre.ethers.deployContract("Whitelist", [10]);

  await whitelistContract.waitForDeployment();

  console.log("Whitelist contract address:",whitelistContract.target);
// sleep for 30 sec while etherscan indexes contract
  await sleep(30*1000)

  //verify the contract on etherscan
  await hre.run("Verify:verify",{
    address:whitelistContract.target,
    constructorArguments:[10],
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(()=>process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
