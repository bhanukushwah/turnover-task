import React from 'react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {

    const userName = (): string => {
        try {
            const user = cookies().get('user')?.value ?? `{ "name": "Guest" }`
            return JSON.parse(user).name
        } catch (_e) {
            return "Guest"
        }
    }

    return (
        <div className='px-8'>
            <div className='flex justify-end text-xs py-2'>
                <ul className='flex gap-4'>
                    <li>
                        <Link href={'#'}>
                            Help
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'}>
                            Orders & Returns
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'}>
                            Hi, {userName()}
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='flex justify-between items-center py-2'>
                <div className='text-3xl font-bold'>
                    ECOMMERCE
                </div>

                <ul className='flex gap-8 font-semibold'>
                    <li>
                        <Link href={'#'}>
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'}>
                            Sale
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'}>
                            Clearance
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'}>
                            New Stock
                        </Link>
                    </li>
                    <li>
                        <Link href={'#'}>
                            Trending
                        </Link>
                    </li>
                </ul>

                <div className='flex gap-8'>
                    <button>
                        <Image src='/assets/icons/search.svg' width={32} height={32} alt="search" />
                    </button>

                    <button>
                        <Image src='/assets/icons/cart.svg' width={32} height={32} alt='cart' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar