import { Button, Input } from '@nextui-org/react'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'

const SignInForm = ({
  onSubmit,
  register,
  loginError
}: {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  register: UseFormRegister<any>
  loginError?: string
}) => {
  return (
    <div className='p-2 flex-col items-start'>
      <div className=' flex flex-col items-start mt-2'>
        <h5 className='!font-bold'>Welcome to Ticket Resell</h5>
        <h6 className='mt-5'>Please sign in or sign up below</h6>
      </div>
      <form noValidate onSubmit={onSubmit} className='mt-5 flex items-start flex-col'>
        <div className='w-full flex flex-col gap-5'>
          <Input isRequired type='username' label='username' className='max-w-xs' {...register('username', { required: true })} />
          <Input isRequired type='password' label='Password' className='max-w-xs' {...register('password', { required: true })} />
          <Button type='submit'>SignIn</Button>
        </div>
      </form>
    </div>
  )
}
export default SignInForm
