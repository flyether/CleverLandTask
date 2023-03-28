export enum DateMode {
   DAYS = 'days',
   MONTHS = 'monthes',
   YEARS = 'years'
 }

 export enum Url {
   BASE_URL = 'https://strapi.cleverland.by',
   PATH_All = '/books/all',
   PATH_BOOKS = '/books/',
   PATH_CATEGORY ='/books/:category',
   PATH_OTHER = '/books/other',
   PATH_API_BOOKS ='api/books',
   PATH_API_BOOKINGS ='/api/bookings',
   PATH_API_CATEGORIES ='/api/categories',
   PATH_API_COMMENTS = '/api/comments',
   PATH_API_REGISTER = '/api/auth/local/register',
   PATH_API_LOCAL ='/api/auth/local',
   PATH_API_FORGOT ='/api/auth/forgot-password',
   PATH_API_RESET ='/api/auth/reset-password',
   PATH_PROFILE='/profile',
   PATH_API_USERS_ME = '/api/users/me',
   PATH_API_UPLOAD = '/api/upload',
   PATH_API_USERS = '/api/users/',
   PATH_API_COMMENTS__BAG = 'https://strapi.cleverland.by/api/comments/'
 }

 export const EMAIL_REGEX = /^[\w.%+-]+@[\w.-]+\.[a-zA-Zа-яА-Я]{2,}$/;
 export const PASSWORD_REGEX = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d)[A-Za-zА-Яа-я\d\-,.%;№"&*^)(!~]+$/;