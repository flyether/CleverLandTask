
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {  BookId } from '../../models/interfaces';



const initialState: BookId = {
  issueYear: '',
  rating: 0,
  title: '',
  authors: [],
  images: [],
  categories: [],
  id: 0,
  booking: {
    id: 0,
    order: false,
    dateOrder: '',
    customerId: 0,
    customerFirstName: '',
    customerLastNam: '',
  },
  delivery: {
    id: null,
    handed: false,
    dateHandedFrom: '',
    dateHandedTo: '',
    recipientId: null,
    recipientFirstName: '',
    recipientLastName: '',
  },
  histories: [],
  description: '',
  publish: '',
  pages: '',
  cover: '',
  weight: '',
  format: '',
  ISBN: '',
  producer: '',
  comments: []
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook(state, action: PayloadAction<BookId>) {
      return { ...action.payload };
    },
    setBookId(state, action: PayloadAction<number>) {
      return {
        ...state,
        id: action.payload
      };
    },
  },
});

export const {   setBookId,  setBook } = bookSlice.actions;

