'use client';

import { currencyFormatter } from "./lib/utils"
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem"
import Modal from "@/components/Modal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

import { useState, useRef, useEffect } from "react";

import { db } from "./lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

import { FaRegTrashAlt } from 'react-icons/fa'

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

  const [income, setIncome] = useState([])
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const amountRef = useRef()
  const descriptionRef = useRef()

  // Handler Function

  const addIncomeHandler = async (e) => {
    e.preventDefault();

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    const collectionRef = collection(db, 'income')

    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      // Update state
      setIncome(prevState => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          }
        ]
      })
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }

  };

  const deleteIncomeEntreHandler = async (incomeId) => {
    const docRef = doc(db, 'income', incomeId)
    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });

      //Update State
    } catch (error) {
      console.log(error.message)
    }

  }

  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, 'income');
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        };
      });

      setIncome(data)
    }

    getIncomeData();

  }, [])

  return (
    <>
      {/* Income Modal */}
      <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
        <form onSubmit={addIncomeHandler} className="input-group">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter income amount"
              required />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="descrption"
              ref={descriptionRef}
              placeholder="Enter income description"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add entry</button>
        </form>

        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>

          {income.map(i => {
            return (
              <div className="flex items-center justify-between" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
                </div>
                <p className="flex items-center gap-2">
                  {currencyFormatter(i.amount)}
                  <button onClick={() => { deleteIncomeEntreHandler(i.id) }}><FaRegTrashAlt /></button>
                </p>
              </div>
            )
          })}
        </div>
      </Modal>



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
