import { Runner, RunnerResult } from "types"
import { describe, it, expect } from "vitest"

export function runTest<Input, Output>(name: string, runner: Runner<Input, Output>) {
  describe(`${name}`, async () => {
    let result: RunnerResult<Input, Output> = await runner()

    it(`outputs ${result.output}`, () => {
      expect(result.output).toBeDefined()
    })
  })
}