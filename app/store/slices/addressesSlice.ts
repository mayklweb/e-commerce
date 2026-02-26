import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddresses } from "../actions/addressesAction";

interface Addresses {
  id: number;
  label: string;
  region: string;
  city: string;
  street: string;
  zip_code: string;
  is_default: true;
}

interface AddressesState {
  addresses: Addresses[];
  loading: boolean;
}

const initialState: AddressesState = {
  addresses: [],
  loading: false,
};

const addressesSlice = createSlice({
  name: "addresses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddresses.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getAddresses.fulfilled,
        (state, action: PayloadAction<Addresses[]>) => {
          state.loading = false;
          state.addresses = action.payload;
        },
      )
      .addCase(getAddresses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default addressesSlice.reducer;
