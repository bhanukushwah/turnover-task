import Image from 'next/image'
import React from 'react'

const Offers = () => {
    return (
        <div className='flex justify-center gap-8 bg-gray-200 py-2'>
            <button>
                <Image src='/assets/icons/left.svg' width={16} height={16} alt="search" />
            </button>
            <p className='text-sm'>
                Get 10% off on business sign up
            </p>
            <button>
                <Image src='/assets/icons/right.svg' width={16} height={16} alt="search" />
            </button>
        </div>
    )
}

export default Offers