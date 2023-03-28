import { FC } from 'react';

import { NameInputProps } from '../../../models/props-interfaces';

export const NameInput: FC<NameInputProps> = ({ handChange, name, className, disabled, onBlur, register, handleLoginChange, placeholder, defaultValue, required }) => (
  <input
  defaultValue={defaultValue}
    type="text"
    className={className}
    {...register(name, {
      disabled,
      required: {
        value: required,
        message: 'Введите корректный e-mail'
      },
    })}
    name={name}
    onInput={handleLoginChange}
    onChange={handChange}
    placeholder= {placeholder}
    onBlur={onBlur}
  />
)


