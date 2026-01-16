import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  signUp: false
}

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    modalOpen: (state, {payload}) => {
      state[payload] = true
    },
    modalClose: (state, {payload}) => {
      state[payload] = false
    },
  }
})

export const {modalClose, modalOpen} = ModalSlice.actions

export default ModalSlice.reducer