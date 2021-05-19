import { ethers } from "ethers"
import { ProofOfHumanity__factory } from "../generated/poh-ethers-contracts/factories/ProofOfHumanity__factory"
import { appConfig, AppConfig, pohContractAddress } from "../src/config"
import { getChallengeInfo } from "./poh"

async function main(configuration: AppConfig) {
  console.info("Starting with configuration:", configuration)

  const provider = new ethers.providers.JsonRpcProvider(configuration.infuraURL)
  provider.pollingInterval = 60 * 1000
  const poh = ProofOfHumanity__factory.connect(pohContractAddress, provider)

  poh.on(poh.filters.AddSubmission(), (_, __, event) => {
    console.info(`Got submission at ${Date.now() / 3600000} add event:`, event)
  })

  poh.on(poh.filters.SubmissionChallenged(), (_, __, ___, event) => {
    console.info("Got submission challenge event:", event)
  })

  // Usage of getSubmissionInfo
  console.info(
    await getChallengeInfo("0xe0da208c5c29d1e89b16c018303b02a89709a1ef", 1, 0)
  )
}

main(appConfig)
  .then(_ => console.log("Done"))
  .catch(console.error)
