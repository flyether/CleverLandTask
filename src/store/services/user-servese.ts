import { Url } from '../../models/constants';
import {
  Email,
  ImgRes,
  ImgUpdateUserReq,
  IResetPassword,
  ResponsePassword,
  UserAutarization,
  UserData,
  UserDataUpdate,
  UserRegistration,
  UserWithToken,
} from '../../models/interfaces';
import { setUserMe } from '../slices/user-data';

import { commonApi } from './common.api';

export const UserAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    regUser: build.mutation<UserWithToken, UserRegistration>({
      query: (userInfo) => ({
        url: Url.PATH_API_REGISTER,
        method: 'POST',
        body: userInfo,
      }),
    }),
    authorizationUser: build.mutation<UserWithToken, UserAutarization>({
      query: (userInfo) => ({
        url: Url.PATH_API_LOCAL,
        method: 'POST',
        body: userInfo,
      }),
    }),
    forgotPassword: build.mutation<ResponsePassword, Email>({
      query: (userInfo) => ({
        url: Url.PATH_API_FORGOT,
        method: 'POST',
        body: userInfo,
      }),
    }),

    resetPassword: build.mutation<UserWithToken, IResetPassword>({
      query: (userInfo) => ({
        url: Url.PATH_API_RESET,
        method: 'POST',
        body: userInfo,
      }),
    }),

    uploadImg: build.mutation<ImgRes[], FormData>({
      query: (data) => ({
        url: Url.PATH_API_UPLOAD,
        method: 'POST',
        body:data
      }),
     
    }),
    updateUser: build.mutation<UserData, UserDataUpdate>({
      query: ({ body, id }) => ({
        url: `${Url.PATH_API_USERS}${id}`,
        method: 'PUT',
        body
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(setUserMe(result.data));
        } catch (e) {
          // Intentionally empty catch block - error handling is performed elsewhere
        }
      },
      invalidatesTags: ['User']
    }),
    updateUserImg: build.mutation<UserData, ImgUpdateUserReq>({
      query: ({ body, id }) => ({
        url: `${Url.PATH_API_USERS}${id}`,
        method: 'PUT',
        body
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(setUserMe(result.data));
        } catch (e) {
    // Intentionally empty catch block - error handling is performed elsewhere
        }
      },
      invalidatesTags: ['User']
    }),
    getUserMe: build.query<UserData, void>({
      query: () => ({ url: Url.PATH_API_USERS_ME }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(setUserMe(result.data));
        } catch (e) {
         // Intentionally empty catch block - error handling is performed elsewhere
        }
      },
      providesTags: ['User'],
    }),
  }),
});
