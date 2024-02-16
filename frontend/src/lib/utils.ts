import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberToRoman(num: number) {
  const romanNumerals = [
    { value: 1000, symbol: "M" },
    { value: 900, symbol: "CM" },
    { value: 500, symbol: "D" },
    { value: 400, symbol: "CD" },
    { value: 100, symbol: "C" },
    { value: 90, symbol: "XC" },
    { value: 50, symbol: "L" },
    { value: 40, symbol: "XL" },
    { value: 10, symbol: "X" },
    { value: 9, symbol: "IX" },
    { value: 5, symbol: "V" },
    { value: 4, symbol: "IV" },
    { value: 1, symbol: "I" },
  ];

  let result = "";

  for (const numeral of romanNumerals) {
    while (num >= numeral.value) {
      result += numeral.symbol;
      num -= numeral.value;
    }
  }

  return result;
}

function boardContainsNegativeOne(board) {
  const flattenMap = board.flat();
  const countOfMinusOne = flattenMap.filter((element) => element === -1).length;
  return countOfMinusOne <= 0;
}

export function checkTicTacToe(board) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== -1 &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return board[i][0]; // Return the winning player (0 for O, 1 for X)
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== -1 &&
      board[0][j] === board[1][j] &&
      board[0][j] === board[2][j]
    ) {
      return board[0][j]; // Return the winning player (0 for O, 1 for X)
    }
  }

  // Check diagonals
  if (
    board[0][0] !== -1 &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return board[0][0]; // Return the winning player (0 for O, 1 for X)
  }
  if (
    board[0][2] !== -1 &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return board[0][2]; // Return the winning player (0 for O, 1 for X)
  }

  // If no winner, return -1
  if (boardContainsNegativeOne(board)) return -1;
  return null; // No winner
}
