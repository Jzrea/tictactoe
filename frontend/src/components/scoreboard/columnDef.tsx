"use client"
import { ColumnDef } from "@tanstack/react-table"


// import { Binary } from "@/types/Game";
// type Rows = [Binary, Binary, Binary];
// type Columns = [Rows, Rows, Rows];

export type GameSession = {
    playerOne: string,
    playerTwo: string,
    winner?: "player 1" | "player 2" | "draw"
}

export const columns: ColumnDef<GameSession>[] = [
    {
        accessorKey: "playerOne",
        header: "X Player 1"
    },
    {
        accessorKey: "playerTwo",
        header: "O Player 2"
    },
    {
        accessorKey: "winner",
        header: "Result"
    },
]