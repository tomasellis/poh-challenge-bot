import { ethers, utils } from "ethers"
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

  poh.on(poh.filters.SubmissionChallenged(), async (_, __, ___, event) => {
    console.info("Got submission challenge event:", event)
    const info = await getChallengeInfo(
      event.args._submissionID,
      event.args._requestID.toNumber(),
      event.args._challengeID.toNumber()
    )
    console.info("Info", info)
  })
}

main(appConfig)
  .then(_ => console.log("Done"))
  .catch(console.error)
