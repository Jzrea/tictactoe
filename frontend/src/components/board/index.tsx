import clsx from "clsx"
import styles from "./styles.module.scss"
import { Circle, X } from "lucide-react";
import { HTMLAttributes, useEffect, useRef, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { checkTicTacToe } from "@/lib/utils";
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import axios from "axios";
import { toast } from "../ui/use-toast";

interface BoardProps extends HTMLAttributes<HTMLDivElement> {
    alert: React.Dispatch<React.SetStateAction<boolean>>,
    winnerState: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
}

type Row = [0 | 1 | -1, 0 | 1 | -1, 0 | 1 | -1];
type Column = [Row, Row, Row];



export const Board = ({ alert, winnerState, className, ...props }: BoardProps) => {
    const boardRef = useRef<HTMLDivElement | null>(null);
    const [hasWinner, setHasWinner] = winnerState;
    const [pos, setPost] = useState<{
        x: number,
        y: number
    } | null>(null);
    const [board, setBoard] = useState<Column>([
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]]);

    const [players, setPlayers] = useSearchParams()

    const playerOne = players.get("one");
    const playerTwo = players.get("two");
    const playerTurn = players.get("turn") == playerOne;
    const currentTurn = players.get("turn");
    const result = players.get("result");
    const round = parseInt(players.get("round") ?? "1");


    function onMouseMoveHandler(e: MouseEvent) {
        // GET MOUSE GRID POSITION
        const rect = document.querySelector("#grid-board");
        if (!rect) return;
        const x = Math.floor((e.clientX - rect.getBoundingClientRect().left) / (rect.clientWidth / 3)),
            y = Math.floor((e.clientY - rect.getBoundingClientRect().top) / (rect.clientHeight / 3));
        if (x < 0 || y < 0 || x >= 4 || y >= 4) return;
        if (board[y][x] != -1) return;

        setPost({ x: x + 1, y: y + 1 })
    }

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMoveHandler);
        return () => {
            window.removeEventListener('mousemove', onMouseMoveHandler);
        }
    }, [board])

    function handlePlayerClick() {
        const rect = document.querySelector("#grid-board");
        if (!rect || !pos) return;
        if (board[pos?.y - 1][pos?.x - 1] != -1) return;
        const tempBoard: Column = [...board];
        tempBoard[pos?.y - 1][pos?.x - 1] = (playerTurn) ? 1 : 0;
        const checkboard = checkTicTacToe(tempBoard);
        // console.log(checkboard)
        switch (checkboard) {
            case -1:
                // DRAW          
                setPlayers(prev => {
                    prev.set("result", result?.concat('2') ?? "")// 2 - for DRAW
                    return prev
                }, { replace: true })
                alert(true);
                break;
            case 0:
                // Player I
                setPlayers(prev => {
                    prev.set("result", result?.concat('0') ?? "") // 1 - PLAYER I WINN                    
                    return prev
                }, { replace: true })
                setHasWinner(true);
                break;
            case 1:
                // Player II
                setPlayers(prev => {
                    prev.set("result", result?.concat('1') ?? "") // 0 - PLAYER II WINN                    
                    return prev
                }, { replace: true })
                setHasWinner(true);
                break;
            default:
                setPlayers(prev => {
                    prev.set("turn", ((playerTurn) ? playerTwo : playerOne) ?? "")
                    return prev
                }, { replace: true })

                break;
        }
        setBoard(tempBoard);
        setPost(null)
    }


    function onContinueGame() {
        setPlayers(prev => {
            prev.set("round", (round + 1).toString())
            prev.set("turn", ((playerTurn) ? playerTwo : playerOne) ?? "")
            return prev
        }, { replace: true });
        setHasWinner(!hasWinner);
        setBoard([
            [-1, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1]]);
    }

    const navigate = useNavigate();

    async function saveSession() {

        try {
            await axios.post("/session", {
                playerOne,
                playerTwo,
                result
            });

        } catch (err) {
            if (err instanceof Error) {

                toast({
                    variant: "destructive",
                    title: "Something went wrong saving session",
                    description: err.message,
                })
            }
        }
    }

    function onExitHandler() {
        saveSession();
        navigate("/")
    }

    return (<>
        <div id="grid-board" ref={boardRef} {...props} className={clsx("bg-card p-3  rounded-md  grid grid-cols-3 grid-rows-3 gap-2", className)} >{
            board.map((column, col) => {
                return column.map((row, rowIndex) => {
                    return (<span
                        key={`${rowIndex}:${col}`}
                        className={clsx(styles.card,
                            "w-full h-full shadow-md  content-center",
                            (row != -1) ? ((row == 1) ? "bg-secondary-focus" : "bg-accent-focus") : "bg-card-inner "
                        )}
                        style={{
                            gridColumn: `${rowIndex + 1} / ${rowIndex + 2}`,
                            gridRow: `${col + 1} / ${col + 2}`
                        }}
                    // onMouseEnter={() => { handleMouseOver(col + 1, rowIndex + 1, row) }}
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
        <AlertDialogContent >
            <AlertDialogHeader>
                <AlertDialogTitle>{(hasWinner) ? `WINNER ${currentTurn}!!` : "DRAW!!"}</AlertDialogTitle>
                <AlertDialogDescription>Get ready for the next round!</AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
                <AlertDialogCancel onClick={onExitHandler}>Exit</AlertDialogCancel>
                <AlertDialogAction onClick={onContinueGame}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </>
    )
}