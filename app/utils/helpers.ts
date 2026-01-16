// // Convert slug to readable text
// export const unslugify = (slug: string): string =>
//   slug
//     .replace(/-/g, " ")
//     .replace(/\w\s*/g, (text) =>
//       text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
//     )

// // ===============================
// // Redux Toolkit Helper
// // ===============================
// import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit"

// type LoadableList<T = any> = {
//   loading: boolean
//   list: T
// }

// type StateWithNamedSlice = Record<string, LoadableList>

// export function buildBuilder<TState extends StateWithNamedSlice, TPayload>(
//   builder: ActionReducerMapBuilder<TState>,
//   request: AsyncThunk<TPayload, any, any>,
//   name: keyof TState
// ) {
//   builder
//     .addCase(request.pending, (state) => {
//       state[name].loading = true
//     })
//     .addCase(request.fulfilled, (state, { payload }) => {
//       state[name].loading = false
//       state[name].list = payload as any
//     })
//     .addCase(request.rejected, (state) => {
//       state[name].loading = false
//     })
// }

// // ===============================
// // Convert comma-separated ids to number[]
// // ===============================
// export const getIds = (arr?: string | null): number[] =>
//   arr && arr.length ? arr.split(",").map((item) => Number(item)) : []
