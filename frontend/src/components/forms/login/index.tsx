"use client"


import styles from '../styles.module.scss';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { LoginSchema } from './schema';
import { useAppDispatch } from '@/app/hooks';
import { login } from '@/app/features/auth/thunk';



interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export const LoginForm = ({ className }: LoginFormProps) => {
    const dispatch = useAppDispatch();


    type FormValues = z.infer<typeof LoginSchema>

    const form = useForm<FormValues>({
        resolver: zodResolver(LoginSchema),

    });


    function onSubmit(payload: FormValues) {
        dispatch(login(payload)).unwrap().catch((res) => {
            if (res.status == 401)
                form.setError("password", {
                    type: 'validate',
                    message: "invalid username or password"
                }, {
                    shouldFocus: false
                });
        })
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className={clsx(styles.root, className)}>

                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input className='' placeholder='username' {...field} type='text' />
                            </FormControl>
                            {/* <FormDescription>
                                This is the name that will be displayed on your profile and in
                                emails.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input className='' placeholder='password' {...field} type='password' />
                            </FormControl>
                            {/* <FormDescription>
                                This is the name that will be displayed on your profile and in
                                emails.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className={clsx('text-base')} type='submit'>Login</Button>
            </form>
        </Form>
    );
}


