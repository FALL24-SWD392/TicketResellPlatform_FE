import { Button, Input, Link } from '@nextui-org/react'
import React, { useContext, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import path from 'src/constants/path'
import banner from 'src/assets/images/banner.svg'
import googleIcon from 'src/assets/images/google.svg'
import IconButton from './IconButton'
import chatapp from 'src/utils/chatapp.config'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { UserCredential } from '@firebase/auth'
import { useNavigate } from 'react-router-dom'
import { AppContext } from 'src/context/app.context'
import { toast } from 'react-toastify'
import { getProfileFormLS } from 'src/utils/auth'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/@types/utils.type'

export interface LoginGoogleBody{
  email: string,
  username: string,
  avatar: string,
  googleToken: string
}

const SignInForm = ({
  onSubmit,
  register,
  loginError
}: {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  register: UseFormRegister<any>
  loginError?: string
}) => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  const loginGoogleMutation = useMutation({
    mutationFn: async (body: LoginGoogleBody) => {
      return await authAPI.loginGoogle(body)
    }
  })

  const handleLoginGoogle = async () => {
    const { auth, signInWithPopup, googleProvider } = { ...chatapp }

    const loginToken: UserCredential = await signInWithPopup(auth, googleProvider)
    console.log(loginToken)
    const idToken = (loginToken as any)._tokenResponse.idToken
    console.log(idToken)
    const { email, displayName, photoURL } = loginToken.user
    const loginBody : LoginGoogleBody = {
      email: email || '',
      username: displayName || '',
      avatar: photoURL || '',
      googleToken: idToken
    }
    console.log(loginBody)
    await loginGoogleMutation.mutate(loginBody, {
      onSuccess: (data) => {
        console.log(data)
        // setIsAuthenticated(true)
        // if (getProfileFormLS()?.scope === 'ADMIN') {
        //   toast.success(data.data.message)
        //   navigate('/admin')
        // } else if (getProfileFormLS()?.scope === 'STAFF') {
        //   toast.success(data.data.message)
        //   navigate('/staff')
        // } else {
        //   toast.success(data.data.message)
        // }
        // toast.success(data.data.message)
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          toast.error(error.message)
        }
      }
    })
  }

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className='p-10 shadow-lg flex-col items-center justify-center max-w-md w-full'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div className='flex flex-col items-center mt-5'>
          <h1 className='text-4xl font-bold mb-5' style={{ color: '#FFFFFF' }}>
            ĐĂNG NHẬP
          </h1>
          <hr className='border-white flex-1 my-2' />
        </div>
        <form noValidate onSubmit={onSubmit} className='mt-5'>
          <div className='w-full flex flex-col items-center gap-5'>
            <Input
              isRequired
              type='email'
              className='max-w-xs'
              placeholder='Email của bạn'
              {...register('username', { required: true })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(15px)'
              }}
            />
            <Input
              isRequired
              type='password'
              className='max-w-xs'
              placeholder='Mật khẩu'
              {...register('password', { required: true })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(15px)'
              }}
            />
            <Button
              type='submit'
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '9999px'
              }}
              className='px-10 py-3 font-semibold'
            >
              ĐĂNG NHẬP
            </Button>

            <div className='flex items-center justify-between w-full mt-2'>
              <label className='text-sm' style={{ color: '#FFFFFF' }}>
                <input type='checkbox' className='mr-2' />
                Ghi nhớ mật khẩu
              </label>
              <Link href={path.forgotPassword} className='text-sm' style={{ color: '#FFFFFF' }}>
                Quên mật khẩu?
              </Link>
            </div>
            <div className='flex items-center w-full my-4'>
              <hr className='flex-1' style={{ borderColor: '#FFFFFF', borderWidth: '1px' }} />
              <span className='mx-3' style={{ color: '#FFFFFF' }}>
                HOẶC
              </span>
              <hr className='flex-1' style={{ borderColor: '#FFFFFF', borderWidth: '1px' }} />
            </div>

            <div className='flex gap-5'>
              <IconButton width={10} height={10} src={googleIcon} alt='Google' onClick={handleLoginGoogle}></IconButton>
            </div>
          </div>
        </form>
        <div className='mt-5 text-center' style={{ color: '#FFFFFF' }}>
          Bạn chưa có tài khoản?{' '}
          <Link href={path.register} className='font-bold' style={{ color: '#FFFFFF' }}>
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
