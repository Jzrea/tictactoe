import React from "react"
import styles from "./styles.module.scss"
import clsx from 'clsx'
import { useSearchParams } from "react-router-dom"
import { numberToRoman } from "@/lib/utils"
import { Board } from "@/components/board"

interface BoardPageProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const BoardPage = ({ className, ...props }: BoardPageProps) => {
    const [players] = useSearchParams()
    const round = players.get("round");
    const result = players.get("result");



    return (
        <>
            <span className="text-5xl font-bold col-start-4 col-end-[-4] row-start-2 w-full text-center pt-5">Round {numberToRoman(parseInt(round ?? "1"))}</span>
            <div {...props} className={clsx(className, styles.root, "flex justify-center  items-center")}>
                <Board />
            </div>
        </>
    )

}