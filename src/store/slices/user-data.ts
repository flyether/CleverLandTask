/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { UserData } from '../../models/interfaces';

type Us = {
  userMe: UserData;
};

const initialState: Us = {
  userMe: {
    id: 0,
    username: '',
    email: '',
    confirmed: false,
    blocked: false,
    createdAt: '',
    updatedAt: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: {
      id: 0,
      description: '',
      name: '',
      type: '',
    },
    comments: [],
    avatar: '',
    booking: {
      id: 0,
      order: false,
      dateOrder: '',
      book: {
        id: 0,
        rating: 0,
        image: null,
        title: '',
        authors: [],
        issueYear: '',
      },
    },

    delivery: {
      id: 0,
      handed: false,
      dateHandedFrom: '',
      dateHandedTo: '',
      book: {
        id: 0,
        rating: 0,
        image: null,
        title: '',
        authors: [],
        issueYear: '',
      },
    },
    history: {
      id: 0,
      books: [],
    },
  },
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setPhoneMe(state, action) {
   state.userMe.phone = action.payload;
    },
    setUserMe(state, action) {
      state = action.payload;
    },
  },
});

export const { setPhoneMe, setUserMe } = userDataSlice.actions;
