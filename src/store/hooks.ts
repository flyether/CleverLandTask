
import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


import type { AppDispatch, RootState } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useErrorMessage= (message: string) => {
   const dispatch = useAppDispatch();

   useEffect(() => {

   }, [dispatch, message]);
 };