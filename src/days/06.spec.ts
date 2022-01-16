import { createRunner } from '!runner'
import { runTest } from '!test'
import { Transformer } from 'types'

// Map<daysToProcreate, numberOfLanternFishes>
type Lanternfishes = Map<number, number>

const lanternfishTransformer: Transformer<Lanternfishes> = (values: string) => {
  return Promise.resolve(
    values
      .split(',')
      .map(Number)
      .reduce((acc, l) => {
        acc.set(l, (acc.get(l) ?? 0) + 1)
        return acc
      }, new Map<number, number>())
    )
  }

const updateLanternfishes = (lanternfishes: Lanternfishes): Lanternfishes => {
  const newLanternfishes = new Map<number, number>()

  for (let days = 7; days >= 0; days--) {
    newLanternfishes.set(days, lanternfishes.get(days + 1) ?? 0)
  }
  const readyToProcreate = lanternfishes.get(0) ?? 0
  newLanternfishes.set(8, readyToProcreate)
  newLanternfishes.set(6, (newLanternfishes.get(6) ?? 0) + readyToProcreate)

  return newLanternfishes
}

const LanternfishesTotal = (lanternfishes: Lanternfishes): number => {
  let len = 0
  for (const lanternfishLen of lanternfishes.values()) {
    len += lanternfishLen
  }
  return len
}

runTest('day 06', createRunner(6, lanternfishTransformer, (lanternfishes) => {
  for (let days = 1; days <= 80; days++) {
    lanternfishes = updateLanternfishes(lanternfishes)
  }
  return Promise.resolve(LanternfishesTotal(lanternfishes))
}))

runTest('day 06 part 2', createRunner(6, lanternfishTransformer, (lanternfishes) => {
  for (let days = 1; days <= 256; days++) {
    lanternfishes = updateLanternfishes(lanternfishes)
  }
  return Promise.resolve(LanternfishesTotal(lanternfishes))
}))
