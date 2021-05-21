export type AppConfig = {
  serverConfig: ServerConfig
  infuraConfig: InfuraConfig,
  twitterConfig: TwitterConfig
}

export type ServerConfig = {
  port: number
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
      serverConfig: {
        port: parseInt(process.env.PORT ?? "5000")
      },
      infuraConfig: {
        url: process.env.INFURA_URL as string
      },
      twitterConfig: {
        apiKey: process.env.TWITTER_API_KEY as string,
        apiSecret: process.env.TWITTER_API_SECRET as string,
        accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
        accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET as string
      }
    }
  )

export const pohContractAddress = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb"
export const pohApi_URL =
  "https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-mainnet"
export const klerosCase_BASEURL = "https://resolve.kleros.io/cases/"
export const pohProfile_BASEURL = "https://app.proofofhumanity.id/profile/"
export const ipfs_BASEURL = "https://ipfs.io/"
