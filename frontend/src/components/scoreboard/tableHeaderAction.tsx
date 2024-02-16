import axios from "axios"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { toast } from "../ui/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import clsx from "clsx";
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { GameSession } from "./columnDef";
import { Table } from "@tanstack/react-table";
import { useContext } from "react";
import { ScoreBoardContext, ScoreBoardContextProps } from "@/pages/dashboard";

interface HeaderActionProps {
    table: Table<GameSession>

}

export const HeaderAction = ({ table }: HeaderActionProps) => {
    const { sessions, setSessions }: ScoreBoardContextProps = useContext(ScoreBoardContext);


    async function onProceed() {
        try {
            const res = await axios.delete("/session");
            if (res.status == 200 && setSessions) setSessions([])
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message)
                toast({
                    variant: "destructive",
                    title: "Something went wrong clearing scoreboard",
                    description: err.message,
                })
            }
        }
    }

    async function onDeleteSelectedHandler() {
        const selectedRows = table.getGroupedSelectedRowModel().rows.map(({ original }) => original.id);
        console.log(selectedRows)
        try {
            const res = await axios.put("/session", selectedRows);
            if (res.status == 200 && sessions && setSessions) {
                const tempSes = [...sessions].filter(({ id }) => !selectedRows.includes(id));
                setSessions(tempSes);
            }
            console.log(res.status)
        } catch (err) {
            if (err instanceof Error) {
                console.error(err.message)
                toast({
                    variant: "destructive",
                    title: "Something went wrong deleteing records",
                    description: err.message,
                })
            }
        }
    }

    return (
        <AlertDialog>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>Clear Scoreboard</AlertDialogTitle>
                    <AlertDialogDescription>this action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onProceed}>Proceed</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="ghost"
                        className={clsx("h-8 w-4 p-0 data-[state=open]:bg-muted")}
                    >
                        <DotsVerticalIcon className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="flex flex-col">
                    <AlertDialogTrigger><DropdownMenuItem >Delete all</DropdownMenuItem></AlertDialogTrigger>
                    <DropdownMenuItem onClick={onDeleteSelectedHandler} >Delete selected</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </AlertDialog>
    )
}