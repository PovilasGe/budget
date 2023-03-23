'use client'

import './globals.css'

import Navigation from "@/components/Navigation";

import FinanceContextProvider from './/lib/store/finance-context';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FinanceContextProvider>
          <Navigation />{children}
        </FinanceContextProvider>
      </body>
    </html >
  )
}
