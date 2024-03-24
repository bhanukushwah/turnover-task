'use client'

import React, { useState } from 'react'
import { Card, Checkbox } from '@/components'
import { api } from '@/trpc/react'
import Pagination from '@/components/pagination'
import { redirect } from 'next/navigation'

const Categories = () => {
    const [page, setPage] = useState(1)
    const pageSize = 6

    const { data, isLoading, error } = api.category.getCategories.useQuery({
        page,
        pageSize
    })

    const likeCategory = api.category.likeCategory.useMutation()
    const unlikeCategory = api.category.unlikeCategory.useMutation()

    if (isLoading) return "Loading..."

    if (error) return redirect('/auth/login')

    return (
        <div className='flex justify-center my-8'>
            <Card title='Please mark your interests!'>
                <p className='text-center pt-2'>We will keep you notified.</p>

                <h5 className='mt-8'>
                    My Saved Interests!
                </h5>

                <div className='mt-4 flex flex-col gap-4'>{
                    data?.data?.categories?.map(category => {
                        return <Checkbox label={category?.name} key={category?.id} defaultChecked={category?.users?.length > 0} onChange={(e) => {
                            if (e.currentTarget.checked) {
                                likeCategory.mutate({ categoryId: category?.id })
                            } else {
                                unlikeCategory.mutate({ categoryId: category?.id })
                            }
                        }} />
                    })
                }
                </div>

                <Pagination currentPage={page} totalPages={Number(data?.data?.count) / pageSize} onPageChange={(pageNumber) => setPage(pageNumber)} />
            </Card >
        </div >
    )
}

export default Categories