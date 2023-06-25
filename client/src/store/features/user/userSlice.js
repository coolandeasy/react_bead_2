import {createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

const initialState = {
	success: null,
	token: "",
	exists: false,
	pending: null,
	user: ""
};

export const userSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		login: (state, data) => {
			state.token = data.payload.accessToken;
			state.user = data.payload.user;
			state.pending = false;
		},
		logout: (state) => {
			state.token = initialState.token;
			state.success = initialState.success;
			state.exists = initialState.exists;
			state.pending = initialState.pending;
		},
		exists: (state, {payload: exists}) => {
			state.exists = exists;
		},
		pending: (state, {payload: pending}) => {
			state.pending = pending;
		},
		success: (state, {payload: success}) => {
			state.success = success;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, () => {
			return initialState;
		})
	}
})

export const {
	login,
	logout,
	exists,
	pending,
	success
} = userSlice.actions;

export default userSlice.reducer;