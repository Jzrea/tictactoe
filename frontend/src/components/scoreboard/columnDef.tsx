"use client"
import { ColumnDef } from "@tanstack/react-table"
import { Circle as PlayerTwo, X as PlayerOne, HeartHandshake as Draw } from "lucide-react";


// import { Binary } from "@/types/Game";
// type Rows = [Binary, Binary, Binary];
// type Columns = [Rows, Rows, Rows];

export type GameSession = {
    id: string,
    playerOne: string,
    playerTwo: string,
    result: string //should only contain combinations of 0|1|2
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
        accessorKey: "rounds",
        header: "Rounds",
        cell: ({ row }) => {
            return (row.getValue("result") as string).length
        }
    },
    {
        accessorKey: "result",
        header: "Score",
        cell: ({ getValue }) => {
            const result = (getValue() as string)?.split('');
            if (result.length <= 0) return;
            const pOne = result.filter(char => char == '1').length
            const pTwo = result.filter(char => !(char == '0')).length
            const draws = result.filter(char => char == '2').length

            return (<div className="flex flex-row space-x-3">
                <div className='flex flex-row space-x-1 items-center'>
                    <span>{pOne}</span>
                    <PlayerOne className='w-5 h-5 ' />
                </div>
                <div className='flex flex-row space-x-1 items-center'>
                    <span>{pTwo}</span>
                    <PlayerTwo className='w-5 h-5 ' />
                </div>
                <div className='flex flex-row space-x-1 items-center'>
                    <span>{draws}</span>
                    <Draw className='w-5 h-5 ' />
                </div>
            </div>)
        },
    },
]