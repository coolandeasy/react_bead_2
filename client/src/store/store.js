import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import loginReducer from './features/login/loginSlice';
import {loginApi} from './features/login/loginApiSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [loginApi.reducerPath]
}

const rootReducer = combineReducers({
	login: loginReducer
})

const persistedReducer = persistReducer(persistConfig, loginReducer);

export const store = configureStore({
	reducer: {
		login: persistedReducer,
		[loginApi.reducerPath]: loginApi.reducer,
	},
	middleware: [thunk, loginApi.middleware],
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);