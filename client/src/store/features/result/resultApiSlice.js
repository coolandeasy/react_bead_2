import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {REHYDRATE} from "redux-persist/es/constants";
import {resultSlice} from "./resultSlice.js";


const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3030",
	prepareHeaders: (headers, {getState}) => {
		const token = getState().user.token;
		if (token !== "") headers.set('authorization', `Bearer ${token}`);
		return headers;
	},
});

export const resultApi = createApi({
	reducerPath: 'resultApi',
	baseQuery: baseQuery,
	extractRehydrationInfo(action, {reducerPath}) {
		if (action.type === REHYDRATE) return action.payload[reducerPath];
	},
	// tagTypes: ['POST'],
	endpoints: (builder) => ({
		getAllResultForSurvey: builder.query({
			query: (id) => ({
				url: `/results?surveyId=${id}`
			}),
			async onQueryStarted(body, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					// console.log(data);
				} catch (err) {
					console.log(err);
				}
			}
		}),
		createNewResultForSurvey: builder.mutation({
			query(body) {
				return {
					url: "results",
					method: "POST",
					body: body
				}
			},
			async onQueryStarted(body, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					// console.log(data);
				} catch (err) {
					console.log(err);
				}
			}
		}),
	}),
})

export const {
	useGetAllResultForSurveyQuery,
	useCreateNewResultForSurveyMutation,
} = resultApi