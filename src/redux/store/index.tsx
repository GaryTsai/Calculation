import { createStore, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import rootReducer from "../reducers";
const store = createStore(rootReducer, applyMiddleware(thunk)); 
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
