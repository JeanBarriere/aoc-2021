import { Transformer } from "types"

export const numbersList: Transformer<number[]> = (value: string) => {
  return Promise.resolve(value.split('\n').map(Number))
}

export const noTransformer: Transformer<string> = (value: string) => {
  return Promise.resolve(value)
}
