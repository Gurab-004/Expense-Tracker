"use client";
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/dbConfig'
import { Budgets, Expenses } from '@/utils/schema'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import ExpenseListTable from './_components/ExpenseListTable'
import { useUser } from '@clerk/nextjs';
const page = () => {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);
  const [budgetList, setBudgetList] = useState([]);
  const [totalSpend, setTotalSpend] = useState(0);

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
    let total = 0;
    for (let b of result) {
      total += b.totalSpend ? b.totalSpend : 0;  // add spend if exists, else add 0
    }
    setTotalSpend(total);
    getAllExpenses();
  }

  //used to get all the expenses in the expense table belonging to user
  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  }



  useEffect(() => {
    user && getBudgetList();
  }, [user]);
  return (
    <div className="p-8">
      {expensesList?.length > 0 ?
        <div className='mt-3'>
          <h2 className='font-bold text-3xl'>Latest Expenses</h2>
          <ExpenseListTable expensesList={expensesList} refreshData={() => getBudgetList()} />
          <div className='grid grid-cols-4 grid-rows-1 bg-slate-50 p-2 mb-0.5'>
            <div className='font-bold'>TotalSpent</div>
            <div className='font-bold'>₹{totalSpend}</div>
            <div> </div>
            <div> </div>
          </div>
        </div>
        :
        <div>
          <div className="w-full bg-slate-200 animate-pulse rounded-lg">
            <span className="block h-[300px] invisible">.</span>
          </div>
        </div>

      }

    </div>
  )
}

export default page