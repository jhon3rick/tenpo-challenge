import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../services/api/request";
import { setSession } from "./authSlice";

type LoginResponse = { token: string; user: { email: string } };

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { dispatch }) => {
    const data = await request<LoginResponse>("login", payload);
    dispatch(setSession({ token: data.token, email: data.user.email }));
    return data;
  }
);
