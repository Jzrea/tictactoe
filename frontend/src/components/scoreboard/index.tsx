import { HTMLAttributes } from "react";
import styles from "./styles.module.scss"
import clsx from 'clsx'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface ScoreBoardProps<TData, TValue> extends HTMLAttributes<HTMLTableElement> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function ScoreBoard<TData, TValue>({
    columns,
    data,
    className, ...props
}: ScoreBoardProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div {...props} className={clsx(className, styles.root, "flex-1 overflow-y-auto")}>
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