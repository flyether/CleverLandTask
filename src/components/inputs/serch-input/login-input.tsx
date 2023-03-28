import { FC } from 'react';

import { LoginInputProps } from '../../../models/props-interfaces';

export const LoginInput: FC<LoginInputProps> = ({ handChange, name, className, disabled, onBlur, register, handleLoginChange, placeholder,   defaultValue }) => (
  <input
    type="text"
    className={className}
    {...register(name, {
      disabled,
      required: 'Поле не может быть пустым',
    })}
    name={name}
    onInput={handleLoginChange}
    onChange={handChange}
    placeholder={placeholder?? 'Login'}
    onBlur={onBlur}
    defaultValue={defaultValue}
  />
)