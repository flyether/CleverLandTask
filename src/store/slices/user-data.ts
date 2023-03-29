import { createSlice } from '@reduxjs/toolkit';

import av from '../../assets/img/avatar.png'
import { Url } from '../../models/constants';
import { UserData } from '../../models/interfaces';

type Us ={
  userMe:UserData
}

const initialState:Us  =  {
  userMe:{
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
    comments:[],
    avatar: '',
    booking:{
      id: 0,
      order: false,
      dateOrder: '',
      book:{
        id: 0,
        rating: 0,
        image: null,
       title: '',
       authors:[],
       issueYear: '',
      },
    },
   
  delivery: {
    id: 0,
    handed: false,
    dateHandedFrom: '',
    dateHandedTo: '',
    book:{
      id: 0,
      rating: 0,
      image: null,
     title: '',
     authors:[],
     issueYear: '',

    },
  },
  history: {
    id: 0,
    books: []
  }

  }
};

export const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setPhoneMe(state, action) {
      return {
        ...state,
        userMe: {
          ...state.userMe,
          phone: action.payload
        }
      };
    },

  setUserMe(state, action) {
   

    return {
      ...state,
      userMe: action.payload,

    };
  }
  },
});

export const { setPhoneMe, setUserMe } = userDataSlice.actions;
