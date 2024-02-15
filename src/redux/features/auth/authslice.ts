import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../../types";

interface IInitialState {
  user: TUser | null;
  token: string | null;
}

const initialState: IInitialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    removeCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;
