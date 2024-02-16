import { HTMLAttributes, useContext, useEffect, useRef } from "react";
import styles from "./styles.module.scss"
import clsx from 'clsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ScoreBoardContext, ScoreBoardContextProps } from "@/pages/dashboard";

interface ScoreBoardProps<TData, TValue> extends HTMLAttributes<HTMLTableElement> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function ScoreBoard<TData, TValue>({
    columns,
    data,
    className, ...props
}: ScoreBoardProps<TData, TValue>) {
    const { sessions, loadSessions }: ScoreBoardContextProps = useContext(ScoreBoardContext);
    const tableRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        function handleScroll() {
            if (tableRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
                const scrollBottom = scrollHeight - scrollTop - clientHeight;

                // Assuming a threshold of 50px from the bottom
                if (scrollBottom <= 50 && loadSessions) {
                    loadSessions();
                    // Do something when scroll reaches below
                }
            }
        }

        if (tableRef.current) {
            tableRef.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (tableRef.current) {
                tableRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [sessions]); // Empty dependency array to run only once on component mount

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div ref={tableRef} {...props} className={clsx(className, styles.root, "flex-1 overflow-y-auto")}>
            <Table className="max-h-40">
                <TableHeader className="sticky top-0 z-50 bg-primary " >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="bg-transparent hover:bg-transparent ">
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className=" text-primary-foreground capitalize">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody >
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center italic font-semibold">
                                Wow such emptiness . . .
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>

    );
}