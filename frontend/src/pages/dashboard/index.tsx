import React, { ChangeEvent, createContext, useEffect, useState } from "react"
import styles from "./styles.module.scss"
import clsx from 'clsx'
import { Button } from "@/components/ui/button"

import { GameSession, columns } from "@/components/scoreboard/columnDef"
import { ScoreBoard } from "@/components/scoreboard"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import axios from "axios"

export interface ScoreBoardContextProps {
    sessions?: GameSession[],
    setSessions?: React.Dispatch<React.SetStateAction<GameSession[]>>,
    loadSessions?: CallableFunction
}

export const ScoreBoardContext = createContext<ScoreBoardContextProps>({});

interface DashboardPageProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const DashboardPage = ({ className, ...props }: DashboardPageProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [sessions, setSessions] = useState<GameSession[]>([]);
    const [hasMoreSessions, setHasMoreSession] = useState<boolean>(true);
    const [players, setPlayers] = useSearchParams({
        one: "",
        two: ""
    })
    const playerOne = players.get("one");
    const playerTwo = players.get("two");


    const navigate = useNavigate();

    const variant = (playerOne?.trim() === '' || playerOne == null) ? "secondary" :
        (playerTwo?.trim() === '' || playerTwo == null) ? "accent" :
            "default";

    const isPlayersSet = (variant == "default");

    async function loadSessions() {
        try {
            if (!hasMoreSessions) return;
            const req = await axios.get("/session", {
                params: {
                    offset: (sessions.length == 0) ? 0 : sessions.length - 1,
                    limit: (sessions.length == 0) ? 20 : 10
                }
            });
            if (!req.data) return
            const payload: [] = req.data.payload;
            if (payload.length <= 0) return;
            const tempSessions: GameSession[] = payload.map(({ _id, playerOne, playerTwo, result }) => {
                return {
                    id: _id,
                    playerOne,
                    playerTwo,
                    result
                }
            });
            setSessions([...sessions, ...tempSessions]);
            setHasMoreSession(req.data.hasMore)
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message)
                toast({
                    variant: "destructive",
                    title: "Something went wrong fetching sessions",
                    description: err.message,
                })
            }
        }
    }

    useEffect(() => {
        loadSessions()
    }, [])


    function handleSetPlayer() {
        if (isPlayersSet) {
            if (playerOne == null || playerOne?.toLowerCase() != inputValue.toLowerCase()) {
                const firstTurn = Math.random() < 0.5 ? playerOne : playerTwo;
                navigate({
                    pathname: "board",
                    search: createSearchParams({
                        one: playerOne ?? "",
                        two: playerTwo ?? "",
                        turn: firstTurn ?? "",
                        round: "1",
                    }).toString()
                })
            } else {
                setPlayers(prev => {
                    prev.set("two", "")
                    setInputValue("");
                    return prev
                })
                toast({
                    variant: "destructive",
                    title: "Nickname taken",
                    description: "Use diffrent nickname",
                })
            }
            return
        }
        const setCurrentPlayer = (playerOne?.trim() === '' || playerOne == null) ? "one" : "two";
        if (playerOne == null || playerOne?.toLowerCase() != inputValue.toLowerCase())
            setPlayers(prev => {
                prev.set(setCurrentPlayer, inputValue)
                setInputValue("");
                return prev
            })
        else {
            setInputValue("");
            toast({
                variant: "destructive",
                title: "Nickname taken",
                description: "Use diffrent nickname",
            })
        }


    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <ScoreBoardContext.Provider value={{ sessions, setSessions, loadSessions }}>
            <Dialog>
                <div {...props} className={clsx(className, styles.root, "flex justify-center  items-center")}>
                    <div className="bg-card space-y-4 p-5 w-full h-3/4 rounded-md flex flex-col ">
                        <div className="flex justify-between  items-center">
                            <span className="text-xl font-bold">Game Sessions</span>
                            <DialogTrigger>
                                <Button className=" w-fit place-self-end">New Game</Button>
                            </DialogTrigger>
                        </div>
                        <ScoreBoard className="" columns={columns} data={sessions} />
                    </div>
                </div>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>{
                        isPlayersSet ?
                            <DialogTitle>Game Info</DialogTitle> :
                            <DialogTitle>Set Player {(variant == "secondary") ? <>I</> : <>II</>}</DialogTitle>
                    }</DialogHeader>
                    <div className="flex items-center space-x-2">{
                        isPlayersSet ?
                            <div className="grid grid-cols-3 grid-rows-3 flex-1 gap-2">
                                <span className="capitalize text-2xl w-full text-right row-start-1 col-start-1">{playerOne}</span>
                                <span className="m-auto italic font-bold row-start-2 col-start-2">VS</span>
                                <span className="capitalize text-2xl w-full text-left row-start-3 col-start-3">{playerTwo}</span>
                            </div> :
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="nickname" className="sr-only">
                                    Nickname
                                </Label>
                                <Input value={inputValue} onChange={handleChange} type="text" id="nickname" placeholder="Nickname" min={5} />
                            </div>

                    }</div>
                    <DialogFooter className="justify-start">
                        <Button type="submit" variant={variant} onClick={handleSetPlayer}>
                            <span className="">{isPlayersSet ? <>Start</> : <>Next</>}</span>
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ScoreBoardContext.Provider>

    )

}