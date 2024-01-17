import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./styles.module.scss"
import { LoginForm } from '@/components/forms/login'
import clsx from 'clsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RegisterForm } from '@/components/forms/register'


function LoginPage() {


    return (
        <Tabs defaultValue="login" className={clsx(styles.form, styles.section)}>
            <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value="login" >Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login"><LoginForm /></TabsContent>
            <TabsContent value="register"><RegisterForm /></TabsContent>
        </Tabs>
    )
}

export default LoginPage