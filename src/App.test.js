import {pathExists, findStartingPositions} from './Functions/validators'

const emptyBoard = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

// test("Empty board should not be a vaild win.", () => {
//   expect(pathExists(emptyBoard)).toBe(false)
// })

// test("Can correctly find starting position.", () => {
//   const board = [
//     [0],
//     [0],
//     [1],
//     [0],
//     [0],
//   ]

//   expect(findStartingPositions(board)).toStrictEqual([[2, 0]])
// })

// test("A straight row should win", () => {
//   const rowBoard = [
//     emptyBoard[0],
//     emptyBoard[1],
//     emptyBoard[2],
//     emptyBoard[3],
//     [1, 1, 1, 1, 1],
//   ]

//   expect(pathExists(rowBoard)).toBe(true)
// })

// test("A simple diagonal should win.", () => {
//   const diag = [
//     [1, 0, 0, 0, 0],
//     [0, 1, 0, 0, 0],
//     [0, 0, 1, 0, 0],
//     [0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 1]
//   ]

//   expect(pathExists(diag)).toBe(true)
// })

// test("A more complex should still win.", () => {
//   const complex = [
//     [1, 1, 0, 0, 0],
//     [0, 1, 0, 0, 0],
//     [0, 0, 1, 1, 0],
//     [0, 0, 0, 1, 0],
//     [0, 0, 0, 1, 1]
//   ]

//   expect(pathExists(complex)).toBe(true)
// })

// test("Multiple starting points should not confuse algo.", () => {
//   const multi = [
//     [1, 1, 0, 0, 0],
//     [0, 1, 0, 0, 0],
//     [0, 0, 1, 1, 0],
//     [1, 0, 0, 1, 0],
//     [0, 1, 0, 1, 1]
//   ]

//   expect(pathExists(multi)).toBe(true)
// })

test("Can travel upwards, no worries", () => {
  const multi = [
    [0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0]
  ]

  const upwards = [
    [0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [1, 0, 0, 0, 0]
  ]

  expect(pathExists(multi)).toBe(true)
  expect(pathExists(upwards)).toBe(true)
})

test("Can travel backwards if really needed", () => {
  const multi = [
    [1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 0, 0, 1],
    [0, 0, 1, 1, 0]
  ]

  expect(pathExists(multi)).toBe(true)
})