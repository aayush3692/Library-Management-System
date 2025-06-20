import BookForm from '@/components/admin/forms/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <Button asChild className='mb-10 w-fit border border-light-300 bg-primary-admin text-xs font-medium text-white hover:bg-primary'>
                <Link href='/admin/books'>
                Go back
                </Link>
            </Button>

            <section className="w-full max-w-2xl">
                <BookForm/>

                </section>
        </>
    )
}

export default page
