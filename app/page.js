'use client';

import { currencyFormatter } from "./lib/utils"
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

import { useState } from "react";

import AddIncomeModal from "@/components/modals/AddIncomeModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: 'smthjtt',
    color: '#000',
    total: 500,
  },
  {
    id: 2,
    title: 'smfdsagdfstt',
    color: 'red',
    total: 55500,
  },
  {
    id: 3,
    title: 'asfsftt',
    color: 'blue',
    total: 2500,
  },
  {
    id: 4,
    title: 'asfsafhjtt',
    color: 'green',
    total: 1500,
  },
]

export default function Home() {

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);

  return (
    <>
      <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />


      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button onClick={() => {

          }} className="btn btn-primary">+expenses</button>
          <button onClick={() => { setShowAddIncomeModal(true) }} className="btn btn-primary-outline">+income</button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {DUMMY_DATA.map(expense => {
              return <ExpenseCategoryItem
                key={expense.id}
                color={expense.color}
                title={expense.title}
                total={expense.total} />
            })}

          </div>
        </section>

        <section className="py6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut data={{
              labels: DUMMY_DATA.map(expense => expense.title),
              datasets: [
                {
                  label: 'expense',
                  data: DUMMY_DATA.map(expense => expense.total),
                  backgroundColor: DUMMY_DATA.map(expense => expense.color),
                  borderColor: ["#18181b"],
                  borderWidth: 2,
                }
              ]
            }} />
          </div>
        </section>
      </main>
    </>
  )
}
