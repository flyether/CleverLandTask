import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';

import { Url } from '../../models/constants';
import { Error } from '../../models/interfaces';
import { RootState } from '../store';


export const commonApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: Url.BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.jwt;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }) as BaseQueryFn<string | FetchArgs, unknown, Error, Record<string, unknown>, FetchBaseQueryMeta>,
  tagTypes: ['User', 'Book', 'Books'],
  endpoints: (_) => ({}),
});
