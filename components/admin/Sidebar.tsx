import Image from 'next/image'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='admin-sidebar'>
            <div>
                <div className='logo'>
                    <Image
                        src='/icons/admin/logo' alt='logo'
                        height={37} width={37} />

                    <h1>BookWise</h1>
                </div>

                <div className='mt-10 flex flex-col gap-5'>
                    
                </div>
            </div>

        </div>
    )
}

export default Sidebar
