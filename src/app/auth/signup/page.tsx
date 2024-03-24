'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { type SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Card, Label, Input, Button } from '@/components'
import { type CreateUserInput, RegisterSchema } from '@/schema/auth'
import { api } from '@/trpc/react'
import VerifyOTP from '../_components/verify-otp'

const Signup = () => {
    const [email, setEmail] = useState("")

    const { mutate } = api.auth.signup.useMutation({
        onSuccess: (res) => setEmail(res?.data?.user?.email)
    })

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<CreateUserInput>({
        resolver: zodResolver(RegisterSchema),
    });


    const onSubmit: SubmitHandler<CreateUserInput> = async (values) => {
        mutate(values)
    }

    return (
        <div className='flex justify-center my-8'>
            {
                email ? <VerifyOTP email={email} /> : <Card title='Create your account'>
                    <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Label htmlFor='Name'>Name</Label>
                            <Input placeholder='Enter your full name' {...register('name')} />
                            {errors.name && <p className='text-sm text-red-500'>{errors.name.message}</p>}
                        </div>

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

                        <Button className='w-full'>CREATE ACCOUNT</Button>
                    </form>

                    <div className='flex gap-2 justify-center py-8'>
                        <p className='text-slate-600'>Have an Account? </p> <Link href={'/auth/login'}>LOGIN</Link>
                    </div>
                </Card>
            }
        </div>
    )
}

export default Signup