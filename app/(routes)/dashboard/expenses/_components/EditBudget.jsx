"use client";

import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import EmojiPicker from 'emoji-picker-react'
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const EditBudget = ({ budgetInfo,refreshData}) => {
    const [emojiIcon, setEmojiIcon] = useState("💰");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);

    // Initialize state when budgetInfo changes
    useEffect(() => {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo?.icon || "💰");
            setName(budgetInfo?.name || "");
            setAmount(budgetInfo?.amount || 0);
        }
    }, [budgetInfo]);

    const onUpdateBudget = async () => {
        const result = await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon
        })
        .where(eq(Budgets.id,budgetInfo.id))
        .returning();
        if(result){
            refreshData();
            toast('Budget Updated!')
        }
    }
    // Do not render if budgetInfo is undefined
    


    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className='bg-blue-500 flex gap-2'><PenBox />Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription asChild>
                            <div className='mt-5'>
                                <Button variant="outline" className="text-lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                                    {emojiIcon}
                                </Button>
                                {openEmojiPicker && (
                                    <EmojiPicker
                                        onEmojiClick={(e) => {
                                            setEmojiIcon(e.emoji)
                                            setOpenEmojiPicker(false)
                                        }}
                                    />
                                )}
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                    <Input
                                        value={name}
                                        placeholder="eg. Food"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Amount</h2>
                                    <Input
                                        value={amount}
                                        type="number"
                                        placeholder="eg. ₹50000"
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button className="mt-5 w-full" disabled={!(name && amount)} onClick={onUpdateBudget}>
                                Update Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget;
