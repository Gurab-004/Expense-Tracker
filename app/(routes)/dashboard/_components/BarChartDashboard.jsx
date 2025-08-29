import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BarChartDashboard = ({budgetList}) => {
  return (
    <div className='border rounded-lg p-5'>
        <div className='flex flex-col items-center'>
            <h2 className='font-bold text-lg mb-2'>Activity</h2>
        </div>
        <ResponsiveContainer width={'80%'} height={300} >
            <BarChart 
            data={budgetList}
            margin={{
                top:7
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSpend" stackId='a' fill="#4845d2" />
                <Bar dataKey="amount" stackId='a' fill="#C3C2FF" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard