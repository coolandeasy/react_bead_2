import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {surveySlice} from "./surveySlice.js";
import {REHYDRATE} from "redux-persist/es/constants";

// const baseURL = ;

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3030",
	prepareHeaders: (headers, {getState}) => {
		const token = getState().user.token;
		if (token !== "") headers.set('authorization', `Bearer ${token}`);
		return headers;
	},
});

export const surveyApi = createApi({
	reducerPath: 'surveyApi',
	baseQuery: baseQuery,
	extractRehydrationInfo(action, {reducerPath}) {
		if (action.type === REHYDRATE) return action.payload[reducerPath];
	},
	tagTypes: ['POST'],
	endpoints: (builder) => ({
		getAllWithLimits: builder.query({
			query: (data) => ({
				url: `/surveys?${data}`
			}),
			async onQueryStarted(body, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					dispatch(surveySlice.actions.getAllWithLimits(data));
				} catch (err) {
					console.log(err);
				}
			}
		}),
		// loginUser: builder.mutation({
		// 	query(body) {
		// 		return {
		// 			url: "authentication",
		// 			method: "POST",
		// 			body: body
		// 		}
		// 	},
		// 	async onQueryStarted(body, {dispatch, queryFulfilled}){
		// 		try {
		// 			dispatch(userSlice.actions.pending(true));
		// 			const {data} = await queryFulfilled;
		// 			dispatch(userSlice.actions.success(true));
		// 			dispatch(userSlice.actions.login(data));
		// 		} catch (err) {
		// 			dispatch(userSlice.actions.pending(false));
		// 			dispatch(userSlice.actions.success(false));
		// 			dispatch(userSlice.actions.logout);
		// 		}
		// 	}
		// }),
	}),
})

export const {
	useGetAllWithLimitsQuery,
} = surveyApi