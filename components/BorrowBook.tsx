'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { borrowBook } from '@/lib/actions/book'

interface Props {
    userId: string,
    bookId: string,
    borrowingEligibility: {
        isEligible: boolean;
        message: string
    }
}
const BorrowBook = ({ bookId,
    userId,
    borrowingEligibility: { isEligible, message } }: Props) => {
    const router = useRouter();

    const handleBorrow = async() => {
        if(!isEligible) {
            toast('Not Eligible', {
                description:'Not eligible to borrow book'
            })
        }

        setBorrowing(true);

        try {
            const result = await borrowBook({bookId, userId});

            if(result.success){
                toast('Success', {
                    description: 'Book borrowed successfully'
                })

                router.push('/my-profile');
            } else {
                toast('Error')
            }

        } catch (error) {
            console.log(error)
            toast('Error', {
                description:'Error occurred!!'
            })
        } finally {
            setBorrowing(false)
        }
    }
    const [borrowing, setBorrowing] = useState(false)
    return (
        <Button className='book-overview_btn' 
        onClick={handleBorrow}
        disabled={borrowing} >
            <Image
                src='/icons/book.svg'
                alt='book' width={20}
                height={20} className='mr-2' />
            <p className='font-bebas-neue text-xl text-dark-100'>
                {borrowing ? 'Borrowing...' : "Borrow Book" }
            </p>
        </Button>
    )
}

export default BorrowBook
