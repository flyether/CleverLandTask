import { createSlice } from '@reduxjs/toolkit';

import { BookingPost, Categories } from '../../models/interfaces';


interface InitialState {
  errorForModal: string | null;
  cat: Categories [];
  lastValueState: string;
  searchValue:string;
  bookigData: BookingPost;
  password:string;
  img: File | null;
}

const initialState:InitialState  = {
 
  errorForModal: '',
  img: null,
  cat: [],
  lastValueState: '',
  searchValue:'',
  bookigData:{
    data: {
      book: '',
      order: true,
      dateOrder: '',
      customer: '',
    }
  },
  password:''
};

export const stateComponentSlice = createSlice({
  name: 'stateComponent',
  initialState,
  reducers: {
    setCategories(state, action) {
      return {
        ...state,
        cat: action.payload
      };
    },
    setImg(state, action) {
      return {
        ...state,
        img: action.payload
      };
    },
    setErrorForModal(state, action) {
      return {
        ...state,
        errorForModal: action.payload
      };
    },
    setPassword(state, action) {
      return {
        ...state,
        password: action.payload
      };
    },
    setBookingData(state, action) {
      return {
        ...state,
        bookigData: action.payload
      };
    },
    setLastValueState(state, action) {
      return {
        ...state,
        lastValueState: action.payload
      };
     },
     setSearchValue(state, action) {
      return {
        ...state,
        searchValue: action.payload
      };
     },
  },
});

export const { setImg, setCategories, setPassword , setLastValueState, setSearchValue, setBookingData, setErrorForModal} = stateComponentSlice.actions;