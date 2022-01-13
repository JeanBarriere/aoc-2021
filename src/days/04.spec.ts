import { createRunner } from '!runner'
import { runTest } from '!test'
import { Transformer } from 'types'

interface BoardNumber {
  value: number,
  found: boolean
}

type Board = BoardNumber[][]

interface Game {
  boards: Board[]
  numbers: number[]
}

const bingoTransformer: Transformer<Game> = (values: string) => {
  const [numbers, ...boards] = values.split('\n\n')

  const numbersList = numbers.split(',').map(Number)
  const boardsList = boards.map(b => b.split('\n').filter(s => !!s).map(b => b.trim().split(/\s+/).map(Number).map(value => ({ value, found: false }))))
  return Promise.resolve({
    boards: boardsList as Board[],
    numbers: numbersList
  })
}

interface Winner {
  winningTotalNotFound: number
  winningNumber: number
}


const findNumberInBoard = (number: number) => (board: Board): Board => {
  return board.map(row => row.map(({ value, found }) => ({ value, found: found || (value === number) })))
}

const findWinner = (board: Board): Winner["winningTotalNotFound"] | undefined => {
  // check rows
  const hasCompletedRow = board
    .map(row => row.reduce((acc, { found }) => acc && found, true))
    .includes(true)

  // check columns
  const hasCompletedCol = board
    .reduce((prevRow, curRow) => prevRow
      .map(({ value, found }, index) => ({ value, found: found && curRow[index].found })))
      .some(row => row.found)

  if (hasCompletedRow || hasCompletedCol) {
    return board.flat().filter(({ found }) => !found).map(({ value }) => value).reduce((acc, cur) => acc + cur, 0)
  }
  return undefined
}

const playGame = (game: Game): Winner | undefined => {
  for (const number of game.numbers) {
    game.boards = game.boards.map(findNumberInBoard(number))
    const [winner] = game.boards.map(findWinner)
    if (winner) {
      return {
        winningNumber: number,
        winningTotalNotFound: winner
      }
    }
  }
  return undefined
}

const playGameUntilLastGame = (game: Game): Winner | undefined => {
  for (const number of game.numbers) {
    game.boards = game.boards.map(findNumberInBoard(number))
    const winners = game.boards.map(findWinner)
    // filter out non winners, clearing the board of the winners
    const stillPlayingBoards = game.boards.filter((_, i) => winners[i] === undefined)
    // if there is no playing board left, but we had a board, then we have our winner
    if (stillPlayingBoards.length === 0 && game.boards.length === 1) {
      return {
        winningNumber: number,
        winningTotalNotFound: game.boards[0].flat().filter(({ found }) => !found).map(({value}) => value).reduce((acc, cur) => acc + cur, 0)
      }
    }
    game.boards = stillPlayingBoards
  }
  return undefined
}

runTest('day 04', createRunner(4, bingoTransformer, (game) => {
  const gameResult = playGame(game)

  if (gameResult) {
    return Promise.resolve(gameResult.winningNumber * gameResult.winningTotalNotFound)
  }
  return Promise.resolve(0)
}))



runTest('day 04 part 2', createRunner(4, bingoTransformer, (game) => {
  const gameResult = playGameUntilLastGame(game)

  if (gameResult) {
    return Promise.resolve(gameResult.winningNumber * gameResult.winningTotalNotFound)
  }
  return Promise.resolve(0)
}))
