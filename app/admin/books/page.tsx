import { Button } from '@/components/ui/button'
import { db } from '@/database/drizzle';
import Link from 'next/link'
import React from 'react'
import { books } from "@/database/schema";
import { desc } from 'drizzle-orm'
import Books from '@/components/admin/Books';

const page = async () => {
    const book = (await db
        .select()
        .from(books)
        .limit(10)
        .orderBy(desc(books.createdAt))) as Book[];

    const slicedBook = book.slice(1);

    return (
        <section className='w-full rounded-2xl bg-white p-7'>
            <div className='flex flex-wrap items-center justify-between gap-2'>
                <h2 className='text-xl font-semibold'>All Books</h2>

                <Button className='bg-primary-admin' asChild>
                    <Link href='/admin/books/new' className='text-white'>
                        + Create a new Book
                    </Link>
                </Button>
            </div>

            <div className='mt-7 w-full overflow-hidden'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <ul className='flex justify-between gap-10 w-full'>
                        <li>Book title</li>
                        <li>Author</li>
                        <li>Genre</li>
                        <li>Date Created</li>
                        <li>Action</li>

                    </ul>
                </div>

                <div>

                    <Books book={book.slice(1)} />


                </div>
            </div>
        </section>
    )
}

export default page
