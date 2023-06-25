import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {userSlice} from "./userSlice.js";
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

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: baseQuery,
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
					dispatch(userSlice.actions.pending(true));
					const {data} = await queryFulfilled;
					dispatch(userSlice.actions.success(true));
					dispatch(userSlice.actions.login(data));
				} catch (err) {
					dispatch(userSlice.actions.pending(false));
					dispatch(userSlice.actions.success(false));
					dispatch(userSlice.actions.logout);
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
					dispatch(userSlice.actions.pending(true));
					const {data} = await queryFulfilled;
					dispatch(userSlice.actions.success(true));
					dispatch(userSlice.actions.exists(false));
				} catch (err) {
					// dispatch("Err");
					dispatch(userSlice.actions.exists(true));
					dispatch(userSlice.actions.pending(false));
				}
			}
		}),
		getSurveysCount: builder.query({
			query: (userID) => userID === undefined ? "" : `/surveys?userId=${userID}`,
		}),
	}),
})

export const {
	useLoginUserMutation,
	useNewUserMutation,
	useGetSurveysCountQuery,
} = userApi