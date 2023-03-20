import { currencyFormatter } from "./lib/utils"
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem"

const DUMMY_DATA = [
  {
    id: 1,
    title: 'smthjtt',
    color: '#000',
    amount: 500,
  },
  {
    id: 2,
    title: 'smfdsagdfstt',
    color: '#000',
    amount: 55500,
  },
  {
    id: 3,
    title: 'asfsftt',
    color: '#000',
    amount: 2500,
  },
  {
    id: 4,
    title: 'asfsafhjtt',
    color: '#000',
    amount: 1500,
  },
]

export default function Home() {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-gray-400 text-md">My balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>

      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+expenses</button>
        <button className="btn btn-primary-outline">+income</button>
      </section>

      <section className="py-6">
        <h3 className="text-2xl">expenses</h3>
        <div className="flex flex-col gap-4 mt-6">
          {DUMMY_DATA.map(expense => {
            return <ExpenseCategoryItem
              color={expense.color}
              title={expense.title}
              amount={expense.amount} />
          })}

        </div>
      </section>
    </main>
  )
}
