import { createRunner } from '!runner'
import { runTest } from '!test'
import { noTransformer } from '!transformers'

runTest('day XX', createRunner(0, noTransformer, (values) => {
  return Promise.resolve(values)
}))
