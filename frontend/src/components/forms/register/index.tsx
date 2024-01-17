"use client"


import styles from '../styles.module.scss';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';
import { UserResigterSchema } from './schema';
import { useAppDispatch } from '@/app/hooks';
import { register } from '@/app/features/auth/thunk';


interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export const RegisterForm = ({ className }: RegisterFormProps) => {
    const dispatch = useAppDispatch();


    type FormValues = z.infer<typeof UserResigterSchema>

    const form = useForm<FormValues>({
        resolver: zodResolver(UserResigterSchema),

    });


    function onSubmit(payload: FormValues) {
        dispatch(register(payload));
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
                                <Input className='' placeholder='username123' {...field} type='text' />
                            </FormControl>
                            {/* <FormDescription>
                                This is the name that will be displayed on your profile and in
                                emails.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                /><FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input className='' placeholder='user@email.com' {...field} type='text' />
                            </FormControl>
                            {/* <FormDescription>
                            This is the name that will be displayed on your profile and in
                            emails.
                        </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                /><FormField
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
                /><FormField
                    control={form.control}
                    name='confirmPassword'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
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
                <Button className={clsx('text-base')} type='submit'>Register</Button>
            </form>
        </Form>
    );
}


