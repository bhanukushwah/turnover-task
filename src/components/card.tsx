import React, { type ReactNode } from 'react'

const Card = ({ children, title }: { children: ReactNode, title: string }) => {
    return (
        <div className='border rounded-lg px-14 py-10 w-full max-w-xl'>
            <h3 className='mb-6 text-center'>{title}</h3>

            {children}
        </div>
    )
}

export default Card