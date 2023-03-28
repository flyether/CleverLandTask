import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { commonApi } from './services/common.api';
import { bookSlice } from './slices/book-slice';
import { booksSlice } from './slices/books-slice';
import { stateComponentSlice } from './slices/state-component-slice';
import { userDataSlice } from './slices/user-data';
import { userSlice } from './slices/user-slice';

export const store = configureStore({
  reducer: {
    [commonApi.reducerPath]: commonApi.reducer,
    books: booksSlice.reducer,
    book: bookSlice.reducer,
    user: userSlice.reducer,
    userData:userDataSlice.reducer,
    stateComponent: stateComponentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commonApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
