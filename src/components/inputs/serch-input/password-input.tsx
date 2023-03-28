import { FC } from 'react';

import { PASSWORD_REGEX } from '../../../models/constants';
import { PasswordInputProps } from '../../../models/props-interfaces';

export const PasswordInput: FC<PasswordInputProps> = ({ handChange, type,  className, placeholder,  disabled, onBlur, register, handleLoginChange, }) => (
  <input
    type={type}
    className={className}
    {...register('password', {
      disabled,
      minLength: {
         value: 8,
         message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
      },
      pattern: PASSWORD_REGEX,
      required: 'Поле не может быть пустым'
   })}
    name='password'
    onInput={handleLoginChange}
    onChange={handChange}
    placeholder= {placeholder}
    onBlur={onBlur}
  />
)

