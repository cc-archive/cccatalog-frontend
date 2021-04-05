export const DONATION_GENERAL_CASE = 'donation_general'
export const DONATION_PERCENTAGE_CASE = 'donation_percentage'

/** @type {import("../index").ABExperiment ABExperiment} */
const donationLanguageCase = {
  name: 'donation_language_revised',
  defaultCase: DONATION_GENERAL_CASE,
  cases: [DONATION_GENERAL_CASE, DONATION_PERCENTAGE_CASE],
}

export default donationLanguageCase
