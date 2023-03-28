/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { UserWithToken } from '../../models/interfaces';

const userFromLocalStorage = localStorage.getItem('user');
const initialState: UserWithToken = userFromLocalStorage
  ? JSON.parse(userFromLocalStorage)
  : {
      jwt: '',
      user: {
        id: 0,
        username: '',
        email: '',
        provader: '',
        confirmed: false,
        blocked: false,
        createdAt: '',
        updatedAt: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
      },
    };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLastName(state, action) {
      state.user.lastName = action.payload;
    },
    setJwt(state, action) {
      state.jwt = action.payload;
    },
    setUserWithToken(state, action) {
      state = action.payload;
    },

    setUserName(state, action) {
      state.user.username = action.payload;
    },
    setUser(state, action) {
      return { ...action.payload };
    },
    setFirstName(state, action) {
      state.user.firstName = action.payload;
    },
    setEmail(state, action) {
      state.user.email = action.payload;
    },
    setPhone(state, action) {
      state.user.phone = action.payload;
    },

    removeUser(state) {
      state.jwt = '';
      state.user.blocked = true;
      state.user.username = '';

      state.user.id = 0;

      state.user.lastName = '';
      state.user.firstName = '';
    },
  },
});

export const {
  setEmail,
  setPhone,
  setFirstName,
  setUserWithToken,
  setUserName,
  setLastName,
  setJwt,
  setUser,
  removeUser,
} = userSlice.actions;
