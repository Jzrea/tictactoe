import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import clsx from 'clsx'
import { useSearchParams } from "react-router-dom"
import { numberToRoman } from "@/lib/utils"
import { Board } from "@/components/board"
import ConfettiExplosion, { ConfettiProps } from 'react-confetti-explosion';

interface BoardPageProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const BoardPage = ({ className, ...props }: BoardPageProps) => {
    const [hasWinner, setHasWinner] = useState<boolean>(false);
    const [players] = useSearchParams()
    const round = players.get("round");
    const result = players.get("result");
    const latestWinner = result?.charAt(result.length - 1);

    useEffect(() => {
        setHasWinner(!hasWinner);
    }, [result])

    const mediumProps: ConfettiProps = {
        force: 0.6,
        duration: 4000,
        particleCount: 100,
        width: 1000,
        colors: ['#9A0023', '#FF003C', '#AF739B', '#FAC7F3', '#F7DBF4'],
    };

    function onConfettiComplete() {
        setHasWinner(!hasWinner);
    }

    return (
        <>
            <span className="text-5xl font-bold col-start-4 col-end-[-4] row-start-2 w-full text-center pt-5">Round {numberToRoman(parseInt(round ?? "1"))}</span>
            <div {...props} className={clsx(className, styles.root, "flex justify-center  items-center")}>
                {latestWinner == "1" && hasWinner && <ConfettiExplosion {...mediumProps} onComplete={onConfettiComplete} />}
                <Board />
                {latestWinner == "0" && hasWinner && <ConfettiExplosion {...mediumProps} onComplete={onConfettiComplete} />}
            </div>
        </>
    )

}