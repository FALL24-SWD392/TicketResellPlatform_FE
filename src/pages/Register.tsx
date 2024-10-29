import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, Link } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/@types/utils.type'
import path from 'src/constants/path'
import authAPI from 'src/apis/auth.api'
import banner from 'src/assets/images/banner.svg'
import facebookIcon from 'src/assets/images/facebook.svg'
import googleIcon from 'src/assets/images/google.svg'

import { AppContext } from 'src/context/app.context'
import { RegisterSchema, RegisterSchemaYup } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export type FormData = RegisterSchema
const Register = () => {
  const navigate = useNavigate()
  const {} = useContext(AppContext)
  const {
    register,
    handleSubmit,
    setError,
    formState: {}
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
    <div
      className='fixed inset-0 flex items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className='p-10 shadow-lg flex flex-col items-center justify-center max-w-lg w-full'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div className='flex flex-col items-center mt-5'>
          <h1 className='text-4xl font-bold mb-5' style={{ color: '#FFFFFF' }}>
            ĐĂNG KÝ
          </h1>
          <div className='flex gap-5'>
            <span className='text-lg font-medium' style={{ color: '#FFFFFF' }}>
              Số điện thoại
            </span>
            <span className='text-lg font-bold' style={{ color: '#FFFFFF' }}>
              Email
            </span>
          </div>
        </div>

        <form noValidate onSubmit={onSubmit} className='mt-5'>
          <div className='w-full flex flex-col items-center gap-0'>
            <Input
              isRequired
              type='text'
              placeholder='User Name'
              className='w-80 text-lg py-3 px-4 text-white'
              {...register('username', { required: true })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(15px)'
              }}
            />
            <Input
              isRequired
              type='email'
              className='w-80 text-lg py-3 px-4 text-white'
              placeholder='Email của bạn'
              {...register('email', { required: true })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(15px)'
              }}
            />
            <Input
              isRequired
              type='password'
              className='w-80 text-lg py-3 px-4 text-white'
              placeholder='Mật khẩu'
              {...register('password', { required: true })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(15px)'
              }}
            />
            <Input
              isRequired
              type='password'
              placeholder='Xác nhận mật khẩu'
              className='w-80 text-lg py-3 px-4 text-white'
              {...register('confirmPassword', { required: true })}
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
              className='px-10 py-3 font-semibold mt-5'
            >
              ĐĂNG KÝ
            </Button>

            <div className='flex items-center w-full my-4'>
              <hr className='flex-1' style={{ borderColor: '#FFFFFF', borderWidth: '1px' }} />
              <span className='mx-3' style={{ color: '#FFFFFF' }}>
                HOẶC
              </span>
              <hr className='flex-1' style={{ borderColor: '#FFFFFF', borderWidth: '1px' }} />
            </div>

            <div className='flex gap-5'>
              <div className='w-12 h-12 rounded-full border-2 border-white flex items-center justify-center'>
                <img src={facebookIcon} alt='Facebook' className='w-8 h-8' />
              </div>
              <div className='w-12 h-12 rounded-full border-2 border-white flex items-center justify-center'>
                <img src={googleIcon} alt='Google' className='w-8 h-8' />
              </div>
            </div>
          </div>
        </form>

        <div className='text-white mt-8' style={{ color: '#FFFFFF' }}>
          Bạn đã có tài khoản?{' '}
          <Link href={path.login} className='font-bold' style={{ color: '#FFFFFF' }}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Register
