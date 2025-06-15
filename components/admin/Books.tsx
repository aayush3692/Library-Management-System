import Image from 'next/image'
import React from 'react'
import AdminBookCard from './AdminBookCard'

interface Props {
    book: Book[]
}

const Books = ({ book }: Props) => {
    return (

        <ul className='flex flex-col justify-between w-full mt-5'>
            {book.map((book1, index) => (
                <AdminBookCard
                    key={index}
                    {...book1}
                />
            ))}
        </ul>

    )
}

export default Books
