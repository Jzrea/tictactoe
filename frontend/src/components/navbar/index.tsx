import { cn } from '@/lib/utils';
import styles from './styles.module.scss';
import { User as UserIcon, Home as HomeIcon, Trophy, HeartCrack as Loser, HeartHandshake as Draw } from "lucide-react";
import { Themer } from '../themer/index.tsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import clsx from 'clsx';
import { Circle, X, Grid3X3 } from "lucide-react";
import { Link, useLocation, useSearchParams } from 'react-router-dom';


export interface navbarProps {
  className?: string | CSSModuleClasses;
}


export function NavBar({ className }: navbarProps) {
  const user = ""

  const loc = useLocation().pathname;

  const [players] = useSearchParams({
    one: "",
    two: "",
    turn: ""
  })
  const playerOne = players.get("one");
  const playerTwo = players.get("two");
  const turn = players.get("turn");
  const result = players.get("result");

  function getTrophies(player: '0' | '1') {
    const trophies = result?.split('')//.filter(char => char == player);
    if (!trophies) return;
    const rounds = trophies?.length <= 5;

    if (rounds)
      return trophies?.map((char) => {
        if (char == player) {
          return <Trophy className='w-8 h-8' />
        } else if (char == '2') {
          return <Draw className='w-8 h-8' />

        } else {
          return <Loser className='w-8 h-8' />

        }
      })
    else {
      const wins = trophies?.filter(char => char == player).length
      const loses = trophies?.filter(char => !(char == '2' || char == player)).length
      const draws = trophies?.filter(char => char == '2').length
      return <>
        {wins != 0 &&
          <div className='space-x-1 items-center'>
            <span>{wins}</span>
            <Trophy className='w-7 h-7 ' />
          </div>
        }
        {draws != 0 && <div className='space-x-1 items-center'>
          <span>{draws}</span>
          <Draw className='w-7 h-7 ' />
        </div>}
        {loses != 0 && <div className='space-x-1 items-center'>
          <span>{loses}</span>
          <Loser className='w-7 h-7 ' />
        </div>}
      </>
    }




  }

  return <nav className={clsx(
    styles.root, className,
    (loc == "/board" && playerOne != "" && playerTwo != "") && ((turn == playerOne) ? styles.turnOne : styles.turnTwo)
  )}>
    {(loc == "/") ?
      <div className={clsx('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', 'p-2 w-fit flex gap-2 text-xl ')}>
        <Grid3X3 className={clsx(styles.home, "")} />Tic Tac Toe
      </div>
      :
      <Link className={clsx('inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50', 'p-2 w-fit flex gap-2 text-xl hover:bg-accent hover:text-accent-foreground')} to={'/'}>
        <HomeIcon className={clsx(styles.home, "")} />Dashboard
      </Link>}
    {(loc == "/board") && <div className={cn(styles.info, " flex justify-evenly font-bold text-2xl")}>
      <div className='items-center space-x-3 max-w-44 overflow-x-auto'>{
        getTrophies('1')
      }</div>
      <span className='flex flex-row items-center justify-center space-x-2 p-2 bg-secondary-focus rounded-md shadow-lg'>
        <X className='w-8 h-8' />  <span>{playerOne}</span></span>
      <span className='italic m-auto mx-0'>VS</span>
      <span className='flex flex-row items-center justify-center space-x-2 p-2 bg-accent-focus rounded-md shadow-lg'><Circle className='w-8 h-8' />  <span>{playerTwo}</span></span>
      <div className='items-center space-x-3 max-w-44 overflow-x-auto'>{
        getTrophies('0')
      }</div>
    </div>}
    <div className={clsx(styles.controls, "")}>
      <Themer />{
        (user) &&
        <DropdownMenu>
          <DropdownMenuTrigger className=' w-fit px-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-foreground dark:hover:text-background'>
            <span className='text-lg self-end pb-1'>{user}</span><UserIcon className="icon" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem >Account</DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      }

    </div>
  </nav>;
}
