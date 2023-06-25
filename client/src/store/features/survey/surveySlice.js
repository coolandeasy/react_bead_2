import {createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

const initialState = {
	data: [],
	total: 0,
	limit: 5,
	skip: 0
};

export const surveySlice = createSlice({
	name: 'survey',
	initialState,
	reducers: {
		getAllWithLimits: (state, data) => {
			state.data = data.payload.data;
			state.total = data.payload.total;
			state.limit = data.payload.limit;
			state.skip = data.payload.skip;
		},
		setLimit: (state, {limit}) => {
			state.limit = limit;
		},
		setSkip: (state, {skip}) => {
			state.skip = skip;
		}
		// logout: (state) => {
		// 	state.token = initialState.token;
		// 	state.success = initialState.success;
		// 	state.exists = initialState.exists;
		// 	state.pending = initialState.pending;
		// },
		// exists: (state, {payload: exists}) => {
		// 	state.exists = exists;
		// },
		// pending: (state, {payload: pending}) => {
		// 	state.pending = pending;
		// },
		// success: (state, {payload: success}) => {
		// 	state.success = success;
		// },
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, () => {
			return initialState;
		})
	}
})

export const {
	getAllWithLimits,
	setLimit,
	setSkip,
} = surveySlice.actions;

export default surveySlice.reducer;