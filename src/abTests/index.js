import { JOINED_AB_TEST_EXPERIMENT } from '~/store-modules/mutation-types'
import donationLanguage from '~/abTests/experiments/donationLanguage'
import { participate } from '~/utils/sixpack'

/**
 * @typedef {Object} ABExperiment - an object describing the a/b experiment
 * @property {string} name - the name of the a/b experiment
 * @property {string} defaultCase - the fallback case if no response is received
 * @property {Array<string>} cases - the array of the experiment cases
 */

/**
 * Attach each a/b test (aka "experiment") to the sixpack session
 * and commit a vuex mutation for each joined experiment.
 *
 * Each experiment is a simple object with the following structure:
 *
 * ```js
 * {
 *   name: 'experiment_name',
 *   defaultCase: 'experiment_default_case_name',
 *   cases: [
 *     'experiment_default_case_name',
 *     'any_other_case_names',
 *     'any_other_case_names',
 *   ]
 *   traffic_fraction: .10 // an optional number between 0 and 1 (100%)
 * }
 * ```
 */
const abTests = (store) => {
  const activeExperiments = [donationLanguage]

  // commit each experiment to Vuex
  const commitExperiments = (experiments) => {
    experiments.map((experiment) => {
      store.commit(JOINED_AB_TEST_EXPERIMENT, {
        name: experiment.name,
        case: experiment.case,
        session: experiment.session,
      })
    })
  }

  return Promise.all(
    activeExperiments.map((/** @type ABExperiment */ experiment) =>
      participate(experiment, { sessionId: store.state.abSessionId })
    )
  ).then(commitExperiments)
}

export default abTests
