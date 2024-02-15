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
  for (const row of board) {
    if (row.includes(-1)) {
      return true; // Board contains -1 element
    }
  }
  return false; // Board does not contain -1 element
}

export function checkTicTacToe(board) {
  if (!boardContainsNegativeOne(board)) return -1;
  const diagonals = [
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (let i = 0; i < 3; i++) {
    const row = board[i];
    const col = [board[0][i], board[1][i], board[2][i]];

    if (row.every((cell) => cell === 0) || col.every((cell) => cell === 0)) {
      return 0; // Player 0 wins
    } else if (
      row.every((cell) => cell === 1) ||
      col.every((cell) => cell === 1)
    ) {
      return 1; // Player 1 wins
    }
  }

  for (const diagonal of diagonals) {
    if (diagonal.every((cell) => cell === 0)) {
      return 0; // Player 0 wins
    } else if (diagonal.every((cell) => cell === 1)) {
      return 1; // Player 1 wins
    }
  }

  return null; // No winner
}
