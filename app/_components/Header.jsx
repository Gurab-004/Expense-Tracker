"use client"; //include this for using useuser useauth()
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser,useAuth,UserButton } from '@clerk/nextjs'
import Link from 'next/link';
function Header() {
  const{user} = useUser();
  const{isSignedIn} = useAuth();
  return (
    <div className='p-5 flex justify-between items-center border shadow-md'>
        <Image
         src={"./logo.svg"}
         alt='logo'
         width={160}
         height={100}
         />
         {isSignedIn?<UserButton/>:
         <Link href={"/dashboard"}>
            <Button>Get Started</Button>
         </Link>
         }
         
    </div>
  )
}

export default Header