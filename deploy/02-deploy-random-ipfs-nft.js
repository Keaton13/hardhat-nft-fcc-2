const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // get the IPFS hashes of our images
    if(process.env.UPLOAD_TO_PINATA == "true"){
        tokenUris = await handleTokenUris()
    }

    // 1.With our own IPFS Node. https://docs.ipfs.io/
    // 2.Pinata 

    let vrfCoordinatorV2Address, subscriptionId

    if (developmentChains.includes(network.name)) {
        const vrfCoordinatorV2Mock = await ethers.getContract(
            "VRFCoordinatorV2Mock"
        )
        vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
        const tx = await vrfCoordinatorV2Mock.createSubscription()
        const txRecipt = await tx.wait(1)
        subscriptionId = txRecipt.ethers.events[0].args.subId
    } else {
        vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
        subscriptionId = networkConfig[chainId].subscriptionId
    }

    log("-----------------------")
    const args = [
        vrfCoordinatorV2Address,
        subscriptionId,
        networkConfig[chainId].gasLane,
        networkConfig[chainId].mintFee,
        // tokenUris
        networkConfig[chainId].callbackGasLimit,
    ]
}

async function handleTokenUris() {
    tokenUris = []
    // store image in IPFS
    // store the metadata in IPFS

    return tokenUris
}