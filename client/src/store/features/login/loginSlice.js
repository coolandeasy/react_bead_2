import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	success: null,
	token: "",
	exists: false,
	pending: null
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		login: (state, {payload: token}) => {
			state.token = token;
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
})

export const {
	login,
	logout,
	exists,
	pending,
	success
} = loginSlice.actions;

export default loginSlice.reducer;