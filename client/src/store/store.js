import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import userReducer from './features/user/userSlice.js';
import surveyReducer from './features/survey/surveySlice.js';
import resultReducer from './features/result/resultSlice.js';
import {userApi} from './features/user/userApiSlice.js';
import {surveyApi} from "./features/survey/surveyApiSlice.js";
import {resultApi} from "./features/result/resultApiSlice.js";
import {persistReducer, persistStore} from 'redux-persist';
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
		result: resultReducer,
		[userApi.reducerPath]: userApi.reducer,
		[surveyApi.reducerPath]: surveyApi.reducer,
		[resultApi.reducerPath]: resultApi.reducer,
	},
	middleware: [thunk, userApi.middleware, surveyApi.middleware, resultApi.middleware],
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);