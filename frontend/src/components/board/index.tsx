import clsx from "clsx"
import styles from "./styles.module.scss"
import { Circle, X } from "lucide-react";
import { HTMLAttributes, useState } from "react"
import { useSearchParams } from "react-router-dom";
import { checkTicTacToe } from "@/lib/utils";

interface BoardProps extends HTMLAttributes<HTMLDivElement> {
    alert: React.Dispatch<React.SetStateAction<boolean>>

}

type Row = [0 | 1 | -1, 0 | 1 | -1, 0 | 1 | -1];
type Column = [Row, Row, Row];



export const Board = ({ alert, className, ...props }: BoardProps) => {
    const [pos, setPost] = useState<{
        x: number,
        y: number
    } | null>();
    const [board, setBoard] = useState<Column>([
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]]);

    // useEffect(() => {
    //     const result = ;
    //     console.log(result);

    // }, [board])

    const [players, setPlayers] = useSearchParams()

    const playerOne = players.get("one");
    const playerTwo = players.get("two");
    const playerTurn = players.get("turn") == playerOne;
    const results = players.get("result");
    const round = parseInt(players.get("round") ?? "1");


    function handleMouseOver(col: number, row: number, val: number) {
        if (val != -1) return;
        setPost({
            x: row,
            y: col
        })
    }

    function handlePlayerClick() {
        if (pos?.x == null || pos.y == null) return;
        if (board[pos?.y - 1][pos?.x - 1] != -1) return;
        const tempBoard = board;
        tempBoard[pos?.y - 1][pos?.x - 1] = (playerTurn) ? 1 : 0;
        setBoard(tempBoard);
        setPost(null)

        switch (checkTicTacToe(tempBoard)) {
            case -1:
                // DRAW
                // console.log("DRAW")
                setPlayers(prev => {
                    prev.set("round", (round + 1).toString())
                    return prev
                }, { replace: true })
                alert(true);
                return;
            case 0:
                // Player II
                // console.log("WINNER: PLAYER II")

                setPlayers(prev => {
                    prev.set("result", results?.concat('0') ?? "")
                    return prev
                }, { replace: true })
                return;
            case 1:
                // Player I
                // console.log("WINNER: PLAYER I")

                setPlayers(prev => {
                    prev.set("result", results?.concat('1') ?? "")
                    return prev
                }, { replace: true })
                return;
            default:
                if (playerTurn) setPlayers(prev => {
                    prev.set("turn", playerTwo ?? "")
                    return prev
                })
                else
                    setPlayers(prev => {
                        prev.set("turn", playerOne ?? "")
                        return prev
                    })
        }
    }

    return (
        <div {...props} className={clsx("bg-card p-3 w-2/3 h-3/4 rounded-md  grid grid-cols-3 grid-rows-3 gap-2", className)} >{
            board.map((column, col) => {
                return column.map((row, rowIndex) => {
                    return (<span
                        key={`${rowIndex}:${col}`}
                        className={clsx(styles.card,
                            "bg-card-inner w-full h-full shadow-md font-extrabold text-8xl flex justify-center content-center",
                            (row != -1) && ((row == 1) ? "bg-secondary-focus" : "bg-accent-focus")
                        )}
                        style={{
                            gridColumn: `${rowIndex + 1} / ${rowIndex + 2}`,
                            gridRow: `${col + 1} / ${col + 2}`
                        }}
                        onMouseEnter={() => { handleMouseOver(col + 1, rowIndex + 1, row) }}
                    >{
                            row != -1 && (row == 1 ? <X /> : <Circle />)
                        }</span>)
                })
            })

        }

            {pos &&
                <span className={clsx(styles.card,
                    "w-full h-full shadow-md font-extrabold text-8xl flex justify-center content-center",
                    (playerTurn) ? "bg-secondary-hover" : "bg-accent-hover"
                )}
                    style={{
                        gridColumn: `${pos?.x} / ${pos?.x + 1}`,
                        gridRow: `${pos?.y} / ${pos?.y + 1}`
                    }}
                    onClick={handlePlayerClick}
                > {
                        playerTurn ? <X /> : <Circle />
                    }</span>
            }
        </div>
    )
}