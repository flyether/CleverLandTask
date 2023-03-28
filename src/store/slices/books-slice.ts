
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Book } from '../../models/interfaces';

interface InitialState extends Book {

  allBooks?: Book[];
 
}

const initialState: InitialState = {
  issueYear: '',
  rating: null,
  title: '',
  authors: [],
  image: {
    url:''
  },
  categories: [],
  id: null,
  booking: {
    id: 0, 
    order: false,
    dateOrder: '',
    customerId: 0,
    customerFirstName:'',
    customerLastNam:'',
  } ,
  delivery: {
    id: null,
    handed: false,
    dateHandedFrom: '',
    dateHandedTo:'',
    recipientId: null,
    recipientFirstName: '',
    recipientLastName:'',
  },
  histories: [],
  allBooks: [],
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {

    setBookImg(state, action) {
      return {
        ...state,
        image: {
          ...state.image,
          url: action.payload
        }
      };
    },
  
    setAllBooks(state, action: PayloadAction<Book[]>) {
      return {
        ...state,
        allBooks: action.payload
      };
    },
  
    setBookId(state, action: PayloadAction<number>) {  
      return {
        ...state,
        id: action.payload
      };
    },
 
  },
});

export const {setBookImg, setAllBooks,  setBookId} = booksSlice.actions;

