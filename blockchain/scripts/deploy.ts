import { ethers } from "hardhat";
import { saveAddress } from './main'


async function main() {
  const OnChainDiploma = await ethers.getContractFactory("OnChainDiploma");
  const onChainDiploma = await OnChainDiploma.deploy('Voenmeh');

  await onChainDiploma.deployed();

  saveAddress("onChainDiploma", onChainDiploma.address)
  console.log(onChainDiploma.address)
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
