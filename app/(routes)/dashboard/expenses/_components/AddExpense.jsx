
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const AddExpense = ({ budgetId, user, refreshData }) => {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);

    const [budgetList, setBudgetList] = useState([]);

    //used to get budget list
    const getBudgetList = async () => {
        const result = await db.select({
            ...getTableColumns(Budgets),
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number)
        }).from(Budgets)
            .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
            .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
            .groupBy(Budgets.id)
            .orderBy(desc(Budgets.id));
        setBudgetList(result);
        console.log(result);
    }

    useEffect(() => {
        user && getBudgetList();
    }, [user,budgetList]);

    const addNewExpense = async () => {
        setLoading(true);

        // find current budget safely
        const selectedBudget = budgetList.find(b => Number(b.id) === Number(budgetId));

        if (!selectedBudget) {
            toast.error("Budget not found!");
            setLoading(false);
            return;
        }

        const remainingAmount = selectedBudget.amount - (selectedBudget.totalSpend || 0);

        if (Number(amount) > remainingAmount) {
            toast.warning(`Expense exceeds remaining budget! You only have ₹${remainingAmount} left.`);
            setLoading(false);
            return;
        }

        // insert expense
        const result = await db.insert(Expenses).values({
            name: name,
            amount: Number(amount),
            budgetId: Number(budgetId),
            createdAt: moment().format("DD/MM/yyyy")
        }).returning({ insertedId: Expenses.id });

        if (result) {
            refreshData();
            toast.success("New Expense Added!");
        }

        setLoading(false);
    };

    // const addNewExpense = async () => {
    //     setLoading(true);
    //     const result = await db.insert(Expenses).values({
    //         name: name,
    //         amount: amount,
    //         budgetId: budgetId,
    //         createdAt: moment().format('DD/MM/yyy')
    //     }).returning({ insertedId: Budgets.id });
    //     console.log(result);

    //     if (result) {
    //         setLoading(false)
    //         refreshData();
    //         toast('New Expense Added!')
    //     }
    //     setLoading(false);
    // }

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input
                    placeholder="eg.Biriyani"
                    onChange={(e) => { setName(e.target.value) }}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input
                    placeholder="eg.₹300"
                    onChange={(e) => { setAmount(e.target.value) }}
                />
            </div>
            <Button
                disabled={!(name && amount)}
                className='mt-3 w-full bg-blue-500'
                onClick={() => addNewExpense()}>{loading ? <Loader className='animate-spin' /> : 'Add New Expense'}</Button>
        </div>
    )
}

export default AddExpense