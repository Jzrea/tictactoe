/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { CrosshairIcon as X, PlusIcon } from "lucide-react";
import * as React from "react";

import clsx from "clsx";
import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
// import { Label } from "components/ui/label";
// import { current } from "@reduxjs/toolkit";
import { Button } from "./button";
// import { useSelector } from "react-redux";

export type DataItem = {
    label: string,
    value: any
};

export function MultiSelect({
    value = [],
    placeholder = "Select an item",
    className,
    data,
    wrap,
    onChangeValue = () => { },
    addData
}: {
    value?: (string | undefined)[],
    placeholder?: string;
    className?: string;
    data: DataItem[];
    wrap?: never,
    onChangeValue?: CallableFunction,
    addData?: CallableFunction,

}) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<any>([]);
    const [inputValue, setInputValue] = React.useState("");

    React.useEffect(() => {
        if (value.length > 0) {
            const values = data.filter((val) => value.some((e) => e === val.value))
            // console.log(value)
            setSelected(values)
        }
    }, [])

    React.useEffect(() => {
        onChangeValue(selected);
    }, [selected])

    const handleUnselect = React.useCallback((item: DataItem) => {
        setSelected((prev: any) => prev.filter((s: any) => s.value !== item.value));
    }, []);


    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        setSelected((prev: any) => {
                            const newSelected = [...prev];
                            newSelected.pop();
                            return newSelected;
                        });
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        []
    );

    const selectables = (data != undefined) ? data.filter((item) => !selected.includes(item)) : [];

    return (
        <div
            className={clsx(
                // label && "gap-1.5",
                className,
                "grid w-full items-center"
            )}
        >
            {/* {label && (
                <Label className="text-[#344054] text-sm font-medium">{label}</Label>
            )} */}
            <Command
                onKeyDown={handleKeyDown}
                className="overflow-visible bg-transparent"
            >
                <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <div className="flex gap-1 flex-wrap">
                        {selected.map((item: { value: any; label: any; }, index: number) => {
                            if (wrap && index > 1) return;
                            return (
                                <Badge key={item.value} className="uppercase">
                                    {item.label}
                                    <button
                                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(item);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={() => handleUnselect(item)}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            );
                        })}
                        {/* {selected.length > 2 && <p>{`+${selected.length - 2} more`}</p>} */}
                        {/* Avoid having the "Search" Icon */}
                        <div className="flex gap-2 w-full">
                            <CommandPrimitive.Input
                                ref={inputRef}
                                value={inputValue}
                                onValueChange={setInputValue}
                                onBlur={() => setOpen(false)}
                                onFocus={() => setOpen(true)}
                                // {...(selected.length <= 0) ? { placeholder: placeholder } : {}}
                                placeholder={placeholder}
                                className={clsx(className, "capitalize ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1")}
                            />{
                                addData &&
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="h-full px-2 lg:px-3"
                                    onClick={() => {
                                        if (inputValue.length <= 0) return;
                                        addData(inputValue);
                                        setInputValue("");
                                    }}
                                >
                                    <PlusIcon className='self-center h-full hover:text-primary-focus cursor-pointer' />
                                </Button>
                            }

                        </div>
                    </div>
                </div>
                <div className="relative mt-2">
                    {open && selectables.length > 0 ? (
                        <div className="absolute w-full top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className={"max-h-[15rem] overflow-auto"}>
                                {selectables.map((item) => {
                                    return (
                                        <CommandItem
                                            key={item.value}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                            onSelect={() => {
                                                setInputValue("");
                                                // console.log(value)
                                                setSelected((prev: any) => [...prev, item]);
                                            }}
                                        >
                                            {item.label}
                                            {/* {editable &&
                                                <DataTableRowActions row={{ ...{ row: { getRowData } } }} />
                                            } */}
                                        </CommandItem>
                                    );
                                })}

                                <CommandItem
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onSelect={() => {
                                        setInputValue("");
                                        // console.log(value)
                                        setSelected(() => data);
                                    }}
                                    className="justify-center lowercase"
                                >
                                    select all
                                </CommandItem>

                            </CommandGroup>
                        </div>
                    ) : null}
                </div>
            </Command>
        </div>
    );
}