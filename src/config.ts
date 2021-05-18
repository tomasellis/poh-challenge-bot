export type AppConfig = {
  infuraURL: string
}

export const appConfig: AppConfig = {
  infuraURL: process.env.INFURA_URL as string,
}

export const pohContractAddress = "0xC5E9dDebb09Cd64DfaCab4011A0D5cEDaf7c9BDb"
