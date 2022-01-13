import { createRunner } from '!runner'
import { runTest } from '!test'
import { noTransformer } from '!transformers'
import { Transformer } from 'types'

const transformer: Transformer<number[][]> = (value: string) => {
  return Promise.resolve(
    value
      .split('\n')
      .map(line => line.split('').map(Number))
  )
}

runTest('day 03', createRunner(3, transformer, (values) => {
  const nbOfLines = values.length
  const sumOfValues = values.reduce((prev, cur) => {
    return prev.map((val, index) => val + (cur[index] ?? 0))
  })
  const gammaRate = sumOfValues.map(val => (nbOfLines / 2) < val ? 1 : 0)
  const epsilonRate = sumOfValues.map(val => (nbOfLines / 2) > val ? 1 : 0)

  const gammaRateDecimal = parseInt(gammaRate.map(String).join(''), 2)
  const epsilonRateDecimal = parseInt(epsilonRate.map(String).join(''), 2)

  return Promise.resolve(gammaRateDecimal * epsilonRateDecimal)
}))


const mostCommonTransformer = (length: number) => (val: number) => (length / 2) <= val ? 1 : 0
const leastCommonTransformer = (length: number) => (val: number) => (length / 2) <= val ? 0 : 1

const findAndFilter = (depth: number, values: number[][], transformer: (length: number) => (val: number, index: number, array: number[]) => number): number[] => {  
  console.log(values.length)
  if (values.length === 1) {
    return values[0]
  }

  const sumOfValues = values.reduce((prev, cur) => {
    return prev.map((val, index) => val + (cur[index] ?? 0))
  })

  const wantedValue = sumOfValues.map(transformer(values.length))
  const wantedValueAtDepth = wantedValue[depth]
  console.log(depth, values.length, sumOfValues, wantedValue, wantedValueAtDepth)

  return findAndFilter(depth + 1, values.filter(value => value[depth] === wantedValueAtDepth), transformer)
}


runTest('day 03 part 2', createRunner(3, transformer, (values) => {

  const oxygenRate = findAndFilter(0, values, mostCommonTransformer)
  const carbonRate = findAndFilter(0, values, leastCommonTransformer)

  
  const oxygenRateDecimal = parseInt(oxygenRate.map(String).join(''), 2)
  const carbonRateDecimal = parseInt(carbonRate.map(String).join(''), 2)
  
  console.log(oxygenRate, carbonRate, oxygenRateDecimal, carbonRateDecimal, oxygenRateDecimal * carbonRateDecimal)
  return Promise.resolve(oxygenRateDecimal * carbonRateDecimal)
}))
