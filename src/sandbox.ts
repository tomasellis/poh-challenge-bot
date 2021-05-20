import { ethers } from "ethers"
import { ProofOfHumanity__factory } from "../generated/poh-ethers-contracts/factories/ProofOfHumanity__factory"
import { AppConfig } from "../src/config"
import * as config from "../src/config"
import { ChallengeInfo, getChallengeInfo } from "./poh"
import * as tweet from "./tweet"
import { NewChallengeTweetData } from "./tweet"

async function main(configuration: AppConfig) {
  console.info("Starting with configuration:", configuration)

  const provider = new ethers.providers.JsonRpcProvider(configuration.infuraConfig.url)
  provider.pollingInterval = 60 * 1000

  const poh = ProofOfHumanity__factory.connect(config.pohContractAddress, provider)
  const santiAddress = "0x2a52309edf998799c4a8b89324ccad91848c8676"
  const santiInfo = await poh.getSubmissionInfo(santiAddress)
  console.info("Got submission info:", santiInfo)

  const infoToTweetData = (challengeInfo: ChallengeInfo) => {
    const tweetData: NewChallengeTweetData = {
      name: challengeInfo.name,
      reasonGiven: challengeInfo.challengeReason,
      pohProfileUrl: challengeInfo.pohProfileLink,
      klerosCaseUrl: challengeInfo.klerosCaseLink
    }
    return tweetData
  }

  const demoChallengeInfo = await getChallengeInfo(
    "0xF8fD6890836e2051112B749a9f981b0827050a47".toLowerCase(),
    0,
    0
  )
  const tweetStatus = tweet.makeStatus(infoToTweetData(demoChallengeInfo))
  console.info("== Demo challenge tweet ==")
  console.log(tweetStatus)

  poh.on(poh.filters.AddSubmission(), (_, __, event) => {
    console.info("Got submission add event:", event)
  })

  poh.on(poh.filters.SubmissionChallenged(), async (_, __, ___, event) => {
    console.info("Got submission challenge event:", event)
    const info = await getChallengeInfo(
      event.args._submissionID,
      event.args._requestID.toNumber(),
      event.args._challengeID.toNumber()
    )
    console.info("Challenge info", info)
    console.info("Tweet status", tweet.makeStatus(infoToTweetData(info)))
  })
}

config.appConfigFromEnvironment()
  .then(main)
  .catch(console.error)
