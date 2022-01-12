import { createRunner } from '!runner'
import { runTest } from '!test'
import { noTransformer } from '!transformers'


runTest('day 2', createRunner(2, noTransformer, (values) => {
  return Promise.resolve(values)
}))
