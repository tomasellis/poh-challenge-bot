import axios from "axios"
import {
  pohApi_URL,
  pohProfile_BASEURL,
  klerosCase_BASEURL,
  ipfs_BASEURL,
} from "./config"

type ChallengeInfo = {
  name: string
  challengeReason: string
  klerosCaseLink: string
  pohProfileLink: string
}

type Evidence = {
  name: string
  description: string
}

export const getChallengeInfo = async (
  submissionId: string,
  requestId: number,
  challengeId: number
) => {
  const res = await axios({
    url: pohApi_URL,
    method: "post",
    data: {
      query: `
        query {
            submission(id: "${submissionId}") {
                name
                requests {
                  type
                  evidence(orderBy:creationTime orderDirection: asc) {
                    URI
                  }
                  challenges {
                    reason
                    challengeID
                    disputeID
                  }
                }
              }
        }`,
    },
  })

  const submission = res.data.data.submission

  const evidenceURI = submission.requests[requestId].evidence[1].URI
  const fullReason: Evidence = (
    await axios.get(`${ipfs_BASEURL}${evidenceURI}`)
  ).data
  console.log("jason", fullReason.description)

  const challengeInfo: ChallengeInfo = {
    name: submission.name,
    challengeReason: fullReason.description,
    pohProfileLink: `${pohProfile_BASEURL}${submissionId.toLowerCase()}`,
    klerosCaseLink: `${klerosCase_BASEURL}${submission.requests[requestId].challenges[challengeId].disputeID}`,
  }

  return challengeInfo
}
