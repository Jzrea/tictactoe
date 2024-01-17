import { SunIcon } from "lucide-react";
import { MoonIcon } from "lucide-react";
import { Button } from '../ui/button';
import { useState } from 'react';
import styles from './styles.module.scss';
import clsx from "clsx";


export interface themerProps {
    className?: string | CSSModuleClasses;
}

export function Themer({ className }: themerProps) {
    const [themeIsDark, setTheme] = useState(localStorage.getItem("theme")?.includes("dark"));


    function changeTheme() {
        if (localStorage.getItem("theme")?.includes("dark")) {
            localStorage.setItem("theme", "");
            document.documentElement.classList.remove('dark');
            setTheme(false);
        } else {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add('dark');
            setTheme(true);
        }
    }
    return (<Button className={clsx(styles.root, className, "px-2 hover:bg-transparent hover:text-foreground dark:hover:text-background")} variant="ghost" onClick={changeTheme}>{themeIsDark ? <MoonIcon /> : <SunIcon />}</Button>);
}
