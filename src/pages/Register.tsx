import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/@types/utils.type'
import authAPI from 'src/apis/auth.api'
import { SignUpForm } from 'src/Components'
import { AppContext } from 'src/context/app.context'
import { RegisterSchema, RegisterSchemaYup } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export type FormData = RegisterSchema
const Register = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(RegisterSchemaYup)
  })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirmPassword'>) => authAPI.register(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data)
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        navigate('/login')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirmPassword'>>>(error)) {
          const formError = error.response?.data.errors
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirmPassword'>, {
                message: formError[key as keyof Omit<FormData, 'confirmPassword'>],
                type: 'Server'  
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='mt-[100px] container-xs flex justify-center'>
      <div className='p-2 flex-col items-start'>
        <div className=' flex flex-col items-start mt-2'>
          <h5 className='!font-bold'>Welcome to Ticket Resell</h5>
          <h6 className='mt-5'>Please sign in or sign up below</h6>
        </div>
        <form noValidate onSubmit={onSubmit} className='mt-5 flex items-start flex-col'>
          <div className='w-full flex flex-col gap-5'>
            <Input isRequired type='text' label='username' className='max-w-xs' {...register('username', { required: true })} />
            <Input isRequired type='email' label='email' className='max-w-xs' {...register('email', { required: true })} />
            <Input isRequired type='password' label='Password' className='max-w-xs' {...register('password', { required: true })} />
            <Input isRequired type='password' label='Confirm Password' className='max-w-xs' {...register('confirmPassword', { required: true })} />
            <Button type='submit'>SignUp</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register
