"use client";

import { cn, getInitials } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Session } from 'next-auth';


const Header = ({ session }: {session: Session}) => {
    // const pathname = usePathname();
    return (
        <header className='my-10 flex justify-between gap-5'>
            <Link href="/">
                <Image src='/icons/logo.svg' alt='logo' width={40} height={40}
                />
            </Link>
            <ul className='flex flex-row items-center gap-4'>

                <li>

                    {/* <form action={async () => {
                        'use server';

                        await signOut()
                    }} className='mb-10'>
                        <Button className='bg-[#FBDB93] text-black'>
                            Logout
                        </Button>
                    </form> */}
                </li>

                <Link href='/my-profile'>
                    <Avatar>
                        <AvatarFallback className='bg-amber-100'>
                            {getInitials(session?.user?.name || 'IN')}
                        </AvatarFallback>
                    </Avatar>
                </Link>

            </ul >

        </header >
    )
}

export default Header
