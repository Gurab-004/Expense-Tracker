"use client";
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid,PiggyBank,ReceiptText,ShieldCheck} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
const SideNav = () => {
    const menuList = [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:"/dashboard"
            
        },
        {
            id:2,
            name:'Budgets',
            icon:PiggyBank,
            path:"/dashboard/budgets"
            
        },
        {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path:"/dashboard/expenses"
            
        },
        // {
        //     id:4,
        //     name:'Upgrade',
        //     icon:ShieldCheck,
        //     path:"/dashboard/upgrade"
            
        // }

    ];
    const path = usePathname();
    useEffect(()=>{
        console.log(path);
    },[path])

  return (
    <div className='h-screen p-5 border shadow-sm'>
        <Link href='/'>
            <Image src="/logo.svg" alt="logo" width={160} height={100} />
        </Link>

        <div className='mt-5'>
            {
                menuList.map((menu,index)=>{
                    return(
                    <Link href={menu.path} key={menu.id} >
                        <h2 className={`flex gap-2 mb-2 items-center text-gray-500 font-medium p-5 cursor-pointer rounded-md hover:bg-blue-100  hover:text-blue-6001 ${path == menu.path && `text-blue-500 bg-blue-100`}`}>
                            <menu.icon/>
                            {menu.name}
                        </h2>
                    </Link>
                );})
            }
        </div>
        <div className='fixed bottom-10 flex p-5 gap-2 items-center'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default SideNav