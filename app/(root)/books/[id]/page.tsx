import { auth } from '@/auth';
import BookOverview from '@/components/BookOverview';
import BoookVideo from '@/components/BoookVideo';
import { db } from '@/database/drizzle';
import { books } from '@/database/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();

    const bookDetails = await db
        .select()
        .from(books)
        .where(eq(books.id, id))
        .limit(1);

    if (!bookDetails) redirect('/404');
    console.log(bookDetails[0].coverUrl)
    return (

        <>
            <BookOverview 
            {...bookDetails[0]} 
            userId={session?.user?.id as string} />

            <div className='book-details'>
                <div className='flex-[1.5]'>
                    <section className='flex flex-col gap-7'>
                        <h3>Video</h3>
                        <BoookVideo videoUrl = {bookDetails[0].videoUrl}/>
                    </section>
                    <section className='mt-10 flex flex-col gap-7'>
                        <h3>Summary</h3>

                        <div className='space-y-7 text-xl text-light-100'>
                            {bookDetails[0].summary.split("\n").map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}

                        </div>

                    </section>
                </div>

            </div>
        </>

    )
}

export default page
