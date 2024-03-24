import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Button, Card, OTPInput } from '@/components'
import { api } from '@/trpc/react'

const VerifyOTP = ({ email }: { email: string }) => {
    const router = useRouter()
    const [otp, setOTP] = useState('')

    const { mutate, status, error } = api.auth.verify.useMutation({
        onSuccess: (res) => {
            localStorage.setItem("user", JSON.stringify(res?.data?.user))
            router.push('/categories')
        }
    })

    const verifyOtp = () => {
        mutate({ email, otp })
    }

    return (
        <Card title='Login'>
            <p className='text-center'>Enter the 8 digit code you have received on <strong>{email}</strong></p>

            <div className='flex flex-col space-y-1 my-8'>
                <p>Code</p>
                <OTPInput onChange={(value) => setOTP(value)} />

                <p className='text-sm text-red-500'>{error?.message}</p>
            </div>

            <Button className='w-full' onClick={verifyOtp} disabled={status === 'pending'}>VERIFY</Button>
        </Card>
    )
}

export default VerifyOTP