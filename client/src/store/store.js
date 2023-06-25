import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import userReducer from './features/user/userSlice.js';
import surveyReducer from './features/survey/surveySlice.js';
import {userApi} from './features/user/userApiSlice.js';
import {surveyApi} from "./features/survey/surveyApiSlice.js";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [userApi.reducerPath]
}

// const rootReducer = combineReducers({
// 	user: userReducer,
// 	survey: surveyReducer
// })

const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		user: persistedUserReducer,
		survey: surveyReducer,
		[userApi.reducerPath]: userApi.reducer,
		[surveyApi.reducerPath]: surveyApi.reducer,
	},
	middleware: [thunk, userApi.middleware, surveyApi.middleware],
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);