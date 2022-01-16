import { createRunner } from '!runner'
import { runTest } from '!test'
import { Transformer } from 'types'

interface Location {
  x: number
  y: number
}

interface Segment {
  from: Location
  to: Location
}

type SegmentList = ReadonlyArray<Segment>

const coordinatesTransformer: Transformer<SegmentList> = (values: string) => {
  const segments = values
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const [from, to] = line
        .split(' -> ')
        .map(set => {
          const [x, y] = set
            .split(',')
            .map(Number);
          return { x, y }
        });
      return { from, to }
    })
  return Promise.resolve(segments)
}

type SegmentMap = number[][]

runTest('day 05', createRunner(5, coordinatesTransformer, (segmentList) => {
  const [maxX, maxY] = segmentList.reduce(([x, y], cur) => [Math.max(cur.from.x, cur.to.x, x), Math.max(cur.from.y, cur.to.y, y)], [0, 0])
  const map: SegmentMap = [...new Array(maxY + 1)].fill(null).map(_ => new Array(maxX + 1).fill(null, 0, maxX + 1).map(_ => 0))
  // evaluate all segments
  for (const segment of segmentList) {
    // we only put in segments with x and y
    if (segment.from.y === segment.to.y) {
      const mnX = Math.min(segment.from.x, segment.to.x)
      const mxX = Math.max(segment.from.x, segment.to.x)
      for (let x = mnX; x <= mxX; x++) {
        map[segment.from.y][x] += 1
      }
    } else if (segment.from.x === segment.to.x) {
      const mnY = Math.min(segment.from.y, segment.to.y)
      const mxY = Math.max(segment.from.y, segment.to.y)
      for (let y = mnY; y <= mxY; y++) {
        map[y][segment.from.x] += 1
      }
    }
  }

  const overlaps = map.flatMap(m => m.filter(n => n > 1)).length

  return Promise.resolve(overlaps)
}))


runTest('day 05 part 2', createRunner(5, coordinatesTransformer, (segmentList) => {
  const [maxX, maxY] = segmentList.reduce(([x, y], cur) => [Math.max(cur.from.x, cur.to.x, x), Math.max(cur.from.y, cur.to.y, y)], [0, 0])
  const map: SegmentMap = [...new Array(maxY + 1)].fill(null).map(_ => new Array(maxX + 1).fill(null, 0, maxX + 1).map(_ => 0))
  // evaluate all segments
  for (const segment of segmentList) {
    if (segment.from.y === segment.to.y) {
      const mnX = Math.min(segment.from.x, segment.to.x)
      const mxX = Math.max(segment.from.x, segment.to.x)
      for (let x = mnX; x <= mxX; x++) {
        map[segment.from.y][x] += 1
      }
    } else if (segment.from.x === segment.to.x) {
      const mnY = Math.min(segment.from.y, segment.to.y)
      const mxY = Math.max(segment.from.y, segment.to.y)
      for (let y = mnY; y <= mxY; y++) {
        map[y][segment.from.x] += 1
      }
    } else {
      // need to evaluates the diagonals
      const xAdd = segment.from.x < segment.to.x ? 1 : -1
      const yAdd = segment.from.y < segment.to.y ? 1 : -1
      let { x, y } = segment.from
      while (x !== segment.to.x && y !== segment.to.y) {
        map[y][x] += 1
        x += xAdd
        y += yAdd
      }
      map[y][x] += 1
    }
  }

  const overlaps = map.flatMap(m => m.filter(n => n > 1)).length

  return Promise.resolve(overlaps)
}))
