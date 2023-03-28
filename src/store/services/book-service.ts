import { Url } from '../../models/constants';
import {
  Book,
  BookId,
  BookingPost,
  BookingUpdate,
  Categories,
  Evaluation,
  EvaluationUpdate,
  ResponseBooking,
  ResponseEvaluation,
} from '../../models/interfaces';
import { setAllBooks, setBookId } from '../slices/books-slice';
import { setCategories } from '../slices/state-component-slice';

import { commonApi } from './common.api';

export const BookAPI = commonApi.injectEndpoints({
  endpoints: (build) => ({
    getBookById: build.query<BookId, string>({
      query: (id) => ({ url: `/${Url.PATH_API_BOOKS}/${id}` }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data.id) dispatch(setBookId(result.data.id));
        } catch (e) {
          // Intentionally empty catch block - error handling is performed elsewhere
        }
      },
      providesTags: ['Book'],
    }),

    getAllBooks: build.query<Book[], void>({
      query: () => ({ url: Url.PATH_API_BOOKS }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const sortedBooks = result.data.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

          dispatch(setAllBooks(sortedBooks));
        } catch (e) {
           // Intentionally empty catch block - error handling is performed elsewhere
        }
      },
      providesTags: ['Books'],
    }),

    getCategories: build.query<Categories[], void>({
      query: () => ({ url: Url.PATH_API_CATEGORIES }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          if (result.data) dispatch(setCategories(result.data));
        } catch (e) {
        // Intentionally empty catch block - error handling is performed elsewhere
        }
      },
    }),

    addComments: build.mutation<ResponseEvaluation, Evaluation>({
      query: (ratingInfo) => ({
        url: Url.PATH_API_COMMENTS,
        method: 'POST',
        body: ratingInfo,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        if (data.data.book) {
          const patchResult = dispatch(
            BookAPI.util.updateQueryData('getBookById', data.data.book, (draft) => {
              if (data.comment && draft.comments !== null) {
                draft.comments.push(data.comment);
              }
            })
          );

          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        }
      },
      invalidatesTags: ['Book'],
    }),

    updateComments: build.mutation<ResponseEvaluation, EvaluationUpdate>({
      query: ({ id, body }) => ({
        url: `${Url.PATH_API_COMMENTS__BAG}${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Book'],
    }),

    booking: build.mutation<ResponseBooking, BookingPost>({
      query: (bookingInfo) => ({
        url: Url.PATH_API_BOOKINGS,
        method: 'POST',
        body: bookingInfo,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
           // Intentionally empty catch block - error handling is performed elsewhere
        }
      },
      invalidatesTags: ['Book', 'Books'],
    }),

    updateBooking: build.mutation<ResponseBooking, BookingUpdate>({
      query: ({ id, body }) => ({
        url: `${Url.PATH_API_BOOKINGS}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Book', 'Books'],
    }),

    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${Url.PATH_API_BOOKINGS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Book', 'Books'],
    }),
  }),
});
