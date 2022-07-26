const { assert } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", function () {
        let basicNft, deployer

        beforeEach(async () => {
            accounts = await ethers.getSigners();
            deployer = accounts[0]
            await deployments.fixture(["mocks", "randomIpfs"])
            randomIpfsNft = await ethers.getContract("RandomIpfsNft")
            vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        })

        describe("constructor", () => {
            it("sets constructor values correctly", async function () {
                const dogTokenUriZero = await randomIpfsNft.getDogTokenUris(0);
                assert(dogTokenUriZero.includes("ipfs://"))
            })
        })
    })