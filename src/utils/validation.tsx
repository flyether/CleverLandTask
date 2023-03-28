import * as Yup from 'yup';

import { EMAIL_REGEX } from '../models/constants';

export const validation = Yup.object().shape({
  email: Yup.string()
    .required('Поле не может быть пустым')
    .matches(
      EMAIL_REGEX,
      'Введите корректный e-mail',
    ),
  username: Yup.string()
    .required('Поле не может быть пустым'),
  password: Yup.string()
    .required('Поле не может быть пустым')
});

export const validationOnChange = Yup.object().shape({
  username: Yup.string()
    .matches(/^[a-zA-Z0-9]*([^\sA-Za-z0-9]+[a-zA-Z0-9]+)*$/, '1')
    .matches(/[a-zA-Z]+/, '2')
    .matches(/\d+/, '3')
    .test('username', '2', (value) => {
      if (value !== undefined && /\d/.test(value) && /[^\sA-Za-z0-9]/.test(value)) {
        return false;
      }

      return true;
    }),

  login: Yup.string()
    .matches(/^[a-zA-Z0-9]*([^\sA-Za-z0-9]+[a-zA-Z0-9]+)*$/, '1')
    .matches(/[a-zA-Z]+/, '2')
    .matches(/\d+/, '3')
    .test('login', '2', (value) => {
      if (value !== undefined && /\d/.test(value) && /[^\sA-Za-z0-9]/.test(value)) {
        return false;
      }

      return true;
    }),

  password: Yup.string()
    .test('password', '5', (value) => {
      if (value && value.length < 8 && /[A-Z]/.test(value) && !/\d/.test(value)) {
        return false;
      }

      return true;
    })
    .test('password', '4', (value) => {
      if (value && value.length < 8 && /[A-Z]/.test(value) && /\d/.test(value)) {
        return false;
      }

      return true;
    })

    .test('password', '6', (value) => {
      if (value && value.length < 8 && !/[A-Z]/.test(value) && !/\d/.test(value)) {
        return false;
      }

      return true;
    })
});