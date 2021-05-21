import * as config from "./config"
import { AppConfig } from "./config"
import { ethers } from "ethers"
import { ProofOfHumanity__factory } from "../generated/poh-ethers-contracts"
import { ChallengeInfo, getChallengeInfo } from "./poh"
import { NewChallengeTweetData } from "./tweet"
import * as tweet from "./tweet"
import express from "express"


// -- RUN


const main = (configuration: AppConfig) => {
  const provider = new ethers.providers.JsonRpcProvider(configuration.infuraConfig.url)
  provider.pollingInterval = 60 * 1000
  const poh = ProofOfHumanity__factory.connect(config.pohContractAddress, provider)

  provider.on("poll", (pollNumber, blockNumber) => console.info(`Poll ${pollNumber}: block ${blockNumber}`))

  poh.on(poh.filters.SubmissionChallenged(), async (_, __, ___, event) => {
    console.info("Got submission challenge event:", event)
    const challengeInfo = await getChallengeInfo(
      event.args._submissionID,
      event.args._requestID.toNumber(),
      event.args._challengeID.toNumber()
    )

    const tweetData = infoToTweetData(challengeInfo)
    console.info("Challenge info: ", challengeInfo)

    const tweetResult = await tweet.postTweet(configuration.twitterConfig)(tweetData)
    console.info("Tweet result: ", tweetResult)
  })

  const app =
    express()
      .get("/ping", (_, res) => res.send("pong"))
      .listen(configuration.serverConfig.port)
}

config.appConfigFromEnvironment()
  .then(main)
  .catch(console.error)


// -- HELPERS


const infoToTweetData = (challengeInfo: ChallengeInfo) => {
  const tweetData: NewChallengeTweetData = {
    name: challengeInfo.name,
    reasonGiven: challengeInfo.challengeReason,
    pohProfileUrl: challengeInfo.pohProfileLink,
    klerosCaseUrl: challengeInfo.klerosCaseLink
  }
  return tweetData
}