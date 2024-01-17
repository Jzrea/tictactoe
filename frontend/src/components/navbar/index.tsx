import { cn } from '@/lib/utils';
import styles from './styles.module.scss';
import { User as UserIcon } from "lucide-react";
import { Themer } from '../themer/index.tsx';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/app/hooks.ts';
import { getCurrentUser, logout } from '@/app/features/auth/index.ts';


export interface navbarProps {
  className?: string | CSSModuleClasses;
}


export function NavBar({ className }: navbarProps) {
  const user = useAppSelector(getCurrentUser);

  // console.log(user)

  const dispatch = useAppDispatch();
  function signOut() {
    dispatch(logout())
  }

  return <nav className={cn(styles.root, className)}>
    <div className={clsx(styles.controls, "")}>
      <Themer />{
        (user) &&
        <DropdownMenu>
          <DropdownMenuTrigger className=' w-fit px-3 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-foreground dark:hover:text-background'>
            <span className='text-lg self-end pb-1'>{user}</span><UserIcon className="icon" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem >Account</DropdownMenuItem>
            <DropdownMenuItem onClick={signOut}>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }

    </div>
  </nav>;
}
