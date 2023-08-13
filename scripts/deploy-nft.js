const hre = require("hardhat")

const contractAddress = "0x78FDBe9Ae2fe16e3C174763E519d39cAD9e447dB"

async function sleep(ms){
    return new Promise((resolve)=>setTimeout(resolve,ms))
}

async function main(){
    const nftContract = await hre.ethers.deployContract("CryptoDevs",[contractAddress])

    await nftContract.waitForDeployment()

    console.log("NFT contract Address :",nftContract.target)

    await sleep(30 * 1000)

    await hre.run("verify:verify",{
        address: nftContract.target,
        constructorArguments: [contractAddress]
    })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });