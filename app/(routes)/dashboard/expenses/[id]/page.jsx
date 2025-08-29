"use client";

import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { eq, getTableColumns, sql, and, desc } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseListTable from '../_components/ExpenseListTable';
import { Button } from '@/components/ui/button';
import { ArrowLeft, PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import EditBudget from '../_components/EditBudget';
import Link from 'next/link';

const ExpensesScreen = ({ params }) => {
  const unwrappedParams = React.use(params); // unwrap the promise

  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();

  //get budget info
  const getBudgetInfo = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        and(
          eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress),
          eq(Budgets.id, unwrappedParams.id) // ✅ unwrapped param
        )
      )
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesList();
  };

  //get latest expenses
  const getExpensesList = async () => {
    const result = await db.select().from(Expenses)
      .where(eq(Expenses.budgetId, unwrappedParams.id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log(result);
  }

  //used to delete budget as well as its expenses
  const deleteBudget = async () => {
    const deleteExpenseResult = await db.delete(Expenses)
      .where(eq(Expenses.budgetId, unwrappedParams.id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db.delete(Budgets)
        .where(eq(Budgets.id, unwrappedParams.id))
        .returning();
      console.log(result);

    }
    toast('Budget deleted!');
    route.replace('/dashboard/budgets');

  }

  useEffect(() => {
    user && getBudgetInfo();
  }, [user, unwrappedParams.id]);

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold flex justify-between items-center'>
        <span className='flex justify-between'>
          <Link href='/dashboard/budgets'>
            <ArrowLeft className='font-bold text-lg mr-2.5' /> 
          </Link> 
          My Expenses
        </span>
        <div className='flex gap-2 items-center'>
          <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='flex gap-2 cursor-pointer' variant='destructive'><Trash /> Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  current budget as well as it's expenses.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()} className='cursor-pointer'>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-5'>
        {budgetInfo ? <BudgetItem budget={budgetInfo} /> : <div className='h-[150px] w-full bg-slate-200 rounded-lg animate-pulse'></div>}
        <AddExpense budgetId={unwrappedParams.id} user={user} refreshData={() => getBudgetInfo()} />
      </div>
      <div className='mt-4'>
        <h2 className='font-bold text-lg'>Latest Expenses</h2>
        <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetInfo()} />
      </div>
    </div>
  );
};

export default ExpensesScreen;
