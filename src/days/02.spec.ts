import { createRunner } from '!runner'
import { runTest } from '!test'
import { Transformer } from 'types'

type action = 'forward' | 'down' | 'up'

const transformer: Transformer<[action, number][]> = (value: string) => {
  return Promise.resolve(
    value
      .split('\n')
      .map((action) => {
        const [act, val] = action.split(' ')
        return [act as action, Number(val)]
      })
  )
}

const submarine = {
  position: 0,
  depth: 0
}

runTest('day 02', createRunner(2, transformer, (values) => {
  values.forEach(([action, value]) => {
    switch (action) {
      case 'forward':
        submarine.position += value
        break;
      case 'down':
        submarine.depth += value
        break;
      case 'up':
        submarine.depth -= value
        break;
    }
  })
  return Promise.resolve(submarine.depth * submarine.position)
}))

const submarine2 = {
  position: 0,
  depth: 0,
  aim: 0
}

runTest('day 2 part 2', createRunner(2, transformer, (values) => {
  values.forEach(([action, value]) => {
    switch (action) {
      case 'forward':
        submarine2.position += value
        submarine2.depth += submarine2.aim * value
        break;
      case 'down':
        submarine2.aim += value
        break;
      case 'up':
        submarine2.aim -= value
        break;
    }
  })
  return Promise.resolve(submarine2.depth * submarine2.position)
}))
