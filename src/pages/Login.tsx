import { Button, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { LoginSchema, LoginSchemaYup } from 'src/utils/rules'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import authAPI from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'
import { getProfileFormLS } from 'src/utils/auth'

export type FormData = LoginSchema

const Login = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile, setIsStaff, ticketId, setTicketId } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    // setError,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchemaYup)
  })

  const [loginError, setLoginError] = useState<string>('')

const loginMutation = useMutation({
  mutationFn: (body: FormData) => {
    console.log(body);
    return authAPI.login(body);
  },
})
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        setIsAuthenticated(true)
        if(getProfileFormLS()?.sub === 'admin'){
          navigate('/admin')
        }
            
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          // trigger()
          const errors = error.response?.data.errors
          setLoginError(errors?.username as string)
        }
      }
    })
  })

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
          <button type='submit'>SignIn</button>
        </div>
      </form>
    </div>
  )
}

export default Login
