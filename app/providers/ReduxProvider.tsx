"use client"

import { Provider } from "react-redux"

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return < >{children}</>
}
