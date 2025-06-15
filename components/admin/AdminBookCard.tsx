import Image from 'next/image'
import React from 'react'

const AdminBookCard = ({ title,
    coverUrl,
    author,
    genre,
    createdAt }: Book) => {
    return (
        <li className='flex '>
            {/* <Image src={coverUrl} alt='cover' 
            width={20} height={20} 
            className='object-contain'/> */}

            <p>{title}</p>
            <p>{author}</p>
            <p>{genre}</p>
            
        </li>
    )
}

export default AdminBookCard
