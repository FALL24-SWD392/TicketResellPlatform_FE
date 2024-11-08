import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/@types/utils.type'
import authAPI from 'src/apis/auth.api'
import { SignInForm } from 'src/Components'
import { AppContext } from 'src/context/app.context'
import { getProfileFormLS } from 'src/utils/auth'
import { LoginSchema, LoginSchemaYup } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export type FormData = LoginSchema
const LoginPage = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: { }
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchemaYup)
  })

  const [loginError, setLoginError] = useState<string>('')

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => {
      return authAPI.login(body)
    }
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        setIsAuthenticated(true)
        if (getProfileFormLS()?.scope === 'ADMIN') {
          toast.success(data.data.message)

          navigate('/admin')
        }else if(getProfileFormLS()?.scope === 'STAFF'){
          toast.success(data.data.message)
          navigate('/staff')
        }else{
        toast.success(data.data.message)

        }
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const errors = error.response?.data.errors
          setLoginError(errors?.username as string)
          toast.success(error.message)

        }
      }
    })
  })
  return (
    <div className='mt-[100px] container-xs'>
      <SignInForm onSubmit={onSubmit} register={register} loginError={loginError} />
    </div>
  )
}
export default LoginPage
