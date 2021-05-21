import { StatusesUpdate, StatusesUpdateParams, TwitterClient } from "twitter-api-client"
import { TwitterConfig } from "./config"


export type NewChallengeTweetData = {
  name: string,
  reasonGiven: string,
  pohProfileUrl: string,
  klerosCaseUrl: string
}


export const postTweet = (twitterConfig: TwitterConfig) => async (data: NewChallengeTweetData): Promise<StatusesUpdate> => {
  const input: StatusesUpdateParams = {
    status: makeStatus(data),
    card_uri: "tombstone://card"
  }

  const twitterClient = new TwitterClient(twitterConfig)
  const res = await twitterClient.tweets.statusesUpdate(input)
  return res
}


/**
 * Makes the string for the tweet status.
 *
 * This tweet format allows for a name with 55-ish characters.
 *
 * Don't worry about the url lengths,
 * twitter interprets them with constant length
 * and will show them shortened if necessary.
 */
export const makeStatus = (data: NewChallengeTweetData): string =>
  `⚖️ ${data.name} has been challenged.

📣「${truncateText(100)(data.reasonGiven)}」

👤 View the profile: ${data.pohProfileUrl}
🔎 Follow the case: ${data.klerosCaseUrl}`



// -- HELPERS


const truncateText = (maxLength: number) => (text: string): string => {
  const ellipsis = "..."
  const truncated =
    text.length <= maxLength
      ? text
      : text.substr(0, maxLength - ellipsis.length).concat(ellipsis)
  return truncated
}