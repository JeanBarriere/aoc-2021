import { createRunner } from '!runner'
import { runTest } from '!test'
import { numbersList } from '!transformers'

enum Measurement {
  UNKNOWN,
  INCREASED,
  DECREASED
}


runTest('day 01', createRunner<number[], number>(1, numbersList, (values) => {
  const measurements = values.reduce((measures, curValue, curIdx, originArr) => {
    if (curIdx < 1) {
      return []
    }
    const prevValue = originArr[curIdx - 1]
    const curMeasure = curValue > prevValue ? Measurement.INCREASED : Measurement.DECREASED
    return [...measures, curMeasure]
  }, [] as Measurement[])

  return Promise.resolve(measurements.filter(measurement => measurement === Measurement.INCREASED).length)
}))


runTest('day 1 part 2', createRunner<number[], number>(1, numbersList, (values) => {
  const measurements = values.reduce((measures, curValue, curIdx, originArr) => {
    if (curIdx < 3) {
      return []
    }
    const prevValue = originArr[curIdx - 1]
    const prevPrevValue = originArr[curIdx - 2]
    const mostPrevValue = originArr[curIdx - 3]
    const curValueForMeasure = curValue + prevValue + prevPrevValue
    const secondValue = prevValue + prevPrevValue + mostPrevValue
    const curMeasure = curValueForMeasure > secondValue ? Measurement.INCREASED : Measurement.DECREASED
    return [...measures, curMeasure]
  }, [] as Measurement[])

  return Promise.resolve(measurements.filter(measurement => measurement === Measurement.INCREASED).length)
}))
