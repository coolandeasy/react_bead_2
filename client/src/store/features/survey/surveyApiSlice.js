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
	// tagTypes: ['POST'],
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
		getByHash: builder.query({
			query: (hash) => ({
				url: `/surveys?hash=${hash}`
			}),
			// async onQueryStarted(body, {dispatch, queryFulfilled}) {
			// 	try {
			// 		const {data} = await queryFulfilled;
			// 	} catch (err) {
			// 		console.log(err);
			// 	}
			// }
		}),
		createNew: builder.mutation({
			query(body) {
				return {
					url: "surveys",
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
		modifyExisting: builder.mutation({
			query(body) {
				return {
					url: `surveys/${body.id}`,
					method: "PATCH",
					body: body.data
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
		deleteExisting: builder.mutation({
			query(id) {
				// console.log(id);
				return {
					url: `surveys/${id}`,
					method: "DELETE"
				}
			},
			// async onQueryStarted(body, {dispatch, queryFulfilled}) {
			// 	try {
			// 		const {data} = await queryFulfilled;
			// 	} catch (err) {
			// 	}
			// }
		}),
	}),
})

export const {
	useGetAllWithLimitsQuery,
	useGetByHashQuery,
	useCreateNewMutation,
	useModifyExistingMutation,
	useDeleteExistingMutation,
} = surveyApi