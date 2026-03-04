// Convert slug to readable text
export const unslugify = (slug: string): string =>
  slug
    .replace(/-/g, " ")
    .replace(/\w\s*/g, (text) =>
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    )

// ===============================
// Redux Toolkit Helper
// ===============================
import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit"

type LoadableList<T = any> = {
  loading: boolean
  list: T
}

type StateWithNamedSlice = Record<string, LoadableList>

export function buildBuilder<TState extends StateWithNamedSlice, TPayload>(
  builder: ActionReducerMapBuilder<TState>,
  request: AsyncThunk<TPayload, any, any>,
  name: keyof TState & string
) {
  builder
    .addCase(request.pending, (state) => {
      state[name].loading = true
    })
    .addCase(request.fulfilled, (state, { payload }) => {
      state[name].loading = false
      state[name].list = payload as any
    })
    .addCase(request.rejected, (state) => {
      state[name].loading = false
    })
}

// ===============================
// Convert comma-separated ids to number[]
// ===============================
export const getIds = (arr?: string | null): number[] =>
  arr && arr.length ? arr.split(",").map((item) => Number(item)) : []


export const latinToCyrillic = (text: string) => {
  return text
    .toLowerCase()
    .replace(/sh/g, "ш")
    .replace(/ch/g, "ч")
    .replace(/ya/g, "я")
    .replace(/yo/g, "ё")
    .replace(/a/g, "а")
    .replace(/b/g, "б")
    .replace(/d/g, "д")
    .replace(/e/g, "е")
    .replace(/f/g, "ф")
    .replace(/g/g, "г")
    .replace(/i/g, "и")
    .replace(/k/g, "к")
    .replace(/l/g, "л")
    .replace(/m/g, "м")
    .replace(/n/g, "н")
    .replace(/o/g, "о")
    .replace(/p/g, "п")
    .replace(/r/g, "р")
    .replace(/s/g, "с")
    .replace(/t/g, "т")
    .replace(/u/g, "у")
    .replace(/v/g, "в")
    .replace(/w/g, "");
};

export const cyrillicToLatin = (text: string): string => {
  return text
    .replace(/ш/g, "sh")
    .replace(/ч/g, "ch")
    .replace(/я/g, "ya")
    .replace(/ё/g, "yo")
    .replace(/ю/g, "yu")
    .replace(/ж/g, "j")
    .replace(/х/g, "x")
    .replace(/қ/g, "q")
    .replace(/ғ/g, "gh")
    .replace(/а/g, "a")
    .replace(/б/g, "b")
    .replace(/д/g, "d")
    .replace(/е/g, "e")
    .replace(/ф/g, "f")
    .replace(/г/g, "g")
    .replace(/и/g, "i")
    .replace(/к/g, "k")
    .replace(/л/g, "l")
    .replace(/м/g, "m")
    .replace(/н/g, "n")
    .replace(/о/g, "o")
    .replace(/п/g, "p")
    .replace(/р/g, "r")
    .replace(/с/g, "s")
    .replace(/т/g, "t")
    .replace(/у/g, "u")
    .replace(/в/g, "v")
    .replace(/й/g, "y")
    .replace(/з/g, "z")
    .replace(/ъ/g, "'")
    .replace(/ /g, "-");  
};