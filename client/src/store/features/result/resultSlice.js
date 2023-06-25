import {createSlice} from "@reduxjs/toolkit";
import {PURGE} from "redux-persist/es/constants";

const initialState = {
	data: [],
	total: 0,
	limit: 5,
	skip: 0
};

export const resultSlice = createSlice({
	name: 'result',
	initialState,
	reducers: {
		getAllByID: (state, data) => {
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
	},
	extraReducers: (builder) => {
		builder.addCase(PURGE, () => {
			return initialState;
		})
	}
})

export const {
	getAllByID,
	setLimit,
	setSkip
} = resultSlice.actions;

export default resultSlice.reducer;