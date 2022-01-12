import { getEnv } from "!env";
import { Executor, Runner, Transformer } from "types";
import { fetch } from "undici";

const SESSION = getEnv('SESSION', '')

export const createRunner = <Input, Output>(id: number, responseTransformer: Transformer<Input>, process: Executor<Input, Output>): Runner<Input, Output> => {
  return async function run () {
    const inputUrl = `https://adventofcode.com/2021/day/${id}/input`
    const input = await fetch(inputUrl, { headers: { cookie: `session=${SESSION}` }})
      .then(res => res.text())
      .then(value => responseTransformer(value))

    const output = await process(input)

    return { input, output }
  }
}
