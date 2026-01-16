import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../api";
import { registerUrl } from "../../utils/urls";
import { BASE_URL } from "@/app/shared/const/baseUrl";

export const register = createAsyncThunk('signup', async (data) => {
    let response = await Axios.post(registerUrl, data);
    return response.data
})      