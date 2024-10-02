import { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

type Rules = {
  [key in
    | 'email'
    | 'password'
    | 'user_name'
    | 'phone_number'
    | 'confirm_password'
    | 'old_password'
    | 'quantity'
    | 'date_ticket'
    | 'image'
    | 'name'
    | 'ticket_price'
    | 'time_end'
    | 'time_start'
    | 'location'
    | 'description'
    | 'type_event']?: RegisterOptions
}

export const getRulesLogin = (getValues?: UseFormGetValues<any>): Rules => {
  return {
    email: {
      required: 'This field is required',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Invalid email'
      }
    },
    password: {
      required: 'This field is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 6 characters'
      }
    },
    confirm_password: {
      required: { value: true, message: 'Confirm password is required' },
      minLength: {
        value: 8,
        message: 'Password must be as least 8 characters'
      },
      validate: typeof getValues === 'function' ? (value) => value === getValues('password') || 'Password nhập lại không đúng' : undefined
    },
    phone_number: {
      required: 'This field is required',
      pattern: {
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: 'Invalid phone number'
      }
    },
    old_password: {
      required: 'This field is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 6 characters'
      }
    }
  }
}

export const LoginSchemaYup = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required!!"),
    password: yup.string().required("Password is required!!")
})

export type LoginSchema = yup.InferType<typeof LoginSchemaYup>