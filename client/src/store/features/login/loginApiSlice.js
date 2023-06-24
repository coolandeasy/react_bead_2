import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {loginSlice} from "./loginSlice.js";
import {REHYDRATE} from "redux-persist/es/constants";


const baseURL = "http://localhost:3030";

export const loginApi = createApi({
	reducerPath: 'loginApi',
	baseQuery: fetchBaseQuery({baseUrl: baseURL}),
	extractRehydrationInfo(action, {reducerPath}) {
		if (action.type === REHYDRATE)	return action.payload[reducerPath];
	},
	tagTypes: ['POST'],
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query(body) {
				return {
					url: "authentication",
					method: "POST",
					body: body
				}
			},
			async onQueryStarted(body, {dispatch, queryFulfilled}){
				try {
					dispatch(loginSlice.actions.pending(true));
					const {data} = await queryFulfilled;
					dispatch(loginSlice.actions.success(true));
					dispatch(loginSlice.actions.login(data.accessToken));
				} catch (err) {
					dispatch(loginSlice.actions.pending(false));
					dispatch(loginSlice.actions.success(false));
					dispatch(loginSlice.actions.logout);
				}
			}
		}),
		newUser: builder.mutation({
			query(body) {
				return {
					url: "users",
					method: "POST",
					body: body
				}
			},
			async onQueryStarted(body, {dispatch, queryFulfilled}){
				try {
					dispatch(loginSlice.actions.pending(true));
					const {data} = await queryFulfilled;
					dispatch(loginSlice.actions.success(true));
					dispatch(loginSlice.actions.exists(false));
				} catch (err) {
					// dispatch("Err");
					dispatch(loginSlice.actions.exists(true));
					dispatch(loginSlice.actions.pending(false));
				}
			}
		}),
	}),
})

export const {
	useLoginUserMutation,
	useNewUserMutation,
} = loginApi