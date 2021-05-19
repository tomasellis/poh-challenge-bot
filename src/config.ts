export type AppConfig = {
  infuraConfig: InfuraConfig,
  twitterConfig: TwitterConfig
}

export type InfuraConfig = {
  url: string
}

export type TwitterConfig = {
  apiKey: string
  apiSecret: string
  accessToken: string
  accessTokenSecret: string
}

export const appConfigFromEnvironment = (): Promise<AppConfig> =>
  Promise.resolve(
    {
      infuraConfig: {
        url: process.env.INFURA_URL as string
      },
      twitterConfig: {
        apiKey: process.env.TWITTER_API_KEY as string,
        apiSecret: process.env.TWITTER_API_SECRET as string,
        accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
        accessTokenSecret: process.env.TWITTER_ACESS_TOKEN_SECRET as string
      }
    }
  )

export const pohContractAddress = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb"
