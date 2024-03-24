"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link'
import React, { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button, Card, Input, Label } from '@/components'
import { api } from '@/trpc/react';
import { LoginSchema, type LoginUserInput } from '@/schema/auth';
import VerifyOTP from '../_components/verify-otp';

const Login = () => {
    const [email, setEmail] = useState("")
    const { mutate, error } = api.auth.login.useMutation({
        onSuccess: (res) => setEmail(res?.data?.user?.email)
    })

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<LoginUserInput>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit: SubmitHandler<LoginUserInput> = async (values: LoginUserInput) => {
        mutate(values)
    }

    return (
        <div className='flex justify-center my-8'>
            {
                email ? <VerifyOTP email={email} /> : <Card title='Login'>
                    <h5 className='text-center'>
                        Welcome back to ECOMMERCE
                    </h5>
                    <p className='text-center pt-2'>The next gen business marketplace</p>


                    {
                        error && <p className='text-center text-sm text-red-500 mb-2'>{error.message}</p>
                    }
                    <form className='space-y-8 mt-8' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label htmlFor='Email'>Email</Label>
                            <Input type='email' placeholder='Enter your email' {...register('email')} />
                            {errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="Password">Password</Label>
                            <Input type='password' placeholder='Enter your password' {...register('password')} />
                            {errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
                        </div>

                        <Button className='w-full'>LOGIN</Button>
                    </form>

                    <div className='flex gap-2 justify-center py-8'>
                        <p className='text-slate-600'>Don’t have an Account?</p> <Link href={'/auth/signup'}>SIGNUP</Link>
                    </div>
                </Card>
            }
        </div>
    )
}

export default Login