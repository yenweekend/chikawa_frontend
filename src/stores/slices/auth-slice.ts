import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  token: string;
  line_id: string;
}

export interface UserState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    set: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clear: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { set, clear } = authSlice.actions;

export default authSlice.reducer;
