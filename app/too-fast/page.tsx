import React from 'react'

const page = () => {
    return (
        <main className='root-container flex min-h-screen flex-col items-center justify-center'>
            <h1 className='font-bebas-neue text-5xl font-bold text-light-100'>
                Whoa, slow down there, Speedy
            </h1>
            <p className='mt-3 max-w-xl text-center text-light-400'>
                429: Too Many Requests
                You’ve sent too many requests in a short period.
                Please slow down and try again later.
            </p>
        </main>
    )
}

export default page