export type AppConfig = {
  infuraURL: string
}

export const appConfig: AppConfig = {
  infuraURL: process.env.INFURA_URL as string,
}

export const pohContractAddress = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb"
export const pohApi_URL =
  "https://api.thegraph.com/subgraphs/name/kleros/proof-of-humanity-mainnet"
export const klerosCase_BASEURL = "https://resolve.kleros.io/cases/"
export const pohProfile_BASEURL = "https://app.proofofhumanity.id/profile/"
export const ipfs_BASEURL = "https://ipfs.io/"
