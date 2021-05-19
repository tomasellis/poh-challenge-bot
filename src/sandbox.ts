import { ethers } from "ethers"
import { ProofOfHumanity__factory } from "../generated/poh-ethers-contracts/factories/ProofOfHumanity__factory"
import { AppConfig } from "../src/config"
import * as config from "../src/config"

async function main(configuration: AppConfig) {
  console.info("Starting with configuration:", configuration)

  const provider = new ethers.providers.JsonRpcProvider(configuration.infuraConfig.url)
  const poh = ProofOfHumanity__factory.connect(config.pohContractAddress, provider)

  const santiAddress = "0x2a52309edf998799c4a8b89324ccad91848c8676"
  const info = await poh.getSubmissionInfo(santiAddress)
  console.info("Got submission info:", info)

  poh.on(poh.filters.AddSubmission(), (_, __, event) => {
    console.info("Got submission add event:", event)
  })

  poh.on(poh.filters.SubmissionChallenged(), (_, __, ___, event) => {
    console.info("Got submission challenge event:", event)
  })
}

config.appConfigFromEnvironment()
  .then(main)
  .catch(console.error)