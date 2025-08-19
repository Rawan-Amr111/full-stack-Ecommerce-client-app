import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStandaloneToast } from "@chakra-ui/react";
import { axiosInstance } from "../../api/axios.config";
import CookieService from "../../services/CookieService";
const initialState = {
  loading: false,
  user: null,
  error: null,
};
const { toast } = createStandaloneToast();
export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.post(`/api/auth/local`, user);
      const token = data.jwt;

      const userRes = await axiosInstance.get(`/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        ...userRes.data,
        jwt: token,
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchUserData = createAsyncThunk(
  "login/fetchUserData",
  async (token, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosInstance.get(`/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        const date = new Date();
        date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * 3);

        const options = {
          path: "/",
          expires: date,
        };
        CookieService.setCookie("jwt", action.payload.jwt, options);
        toast({
          title: "logged in successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          if (action.payload.isAdmin) {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/";
          }
        }, 3000);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        toast({
          title: action.payload.response.data.error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});
export const selectLogin = ({ login }) => login;
export default loginSlice.reducer;
