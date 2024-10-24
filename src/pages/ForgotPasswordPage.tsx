import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/@types/utils.type'
import authAPI from 'src/apis/auth.api'
import ForgotPasswordForm from 'src/Components/ForgotPasswordForm'
import { ForgotSchema, ForgotSchemaYup } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export type FormDataForgot = ForgotSchema

const ForgotPasswordPage = () => {
  const [forgotPasswordError, setForgotPasswordError] = useState<string>('') // Keep state handling here.
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataForgot>({
    resolver: yupResolver(ForgotSchemaYup)
  })

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: FormDataForgot) => {
      return authAPI.ForgotPassword(body)
    }
  })

  const onSubmit = handleSubmit((data) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: (response) => {
        toast.success('Password reset link sent successfully!')
        // navigate('/login')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormDataForgot>>(error)) {
          const errors = error.response?.data.errors
          setForgotPasswordError(errors?.email || 'Something went wrong')
        }
      }
    })
  })

  return (
    <div className="mt-[100px] container-xs">
      <ForgotPasswordForm 
        onSubmit={onSubmit} 
        register={register} 
        forgotError={forgotPasswordError} 
      />
    </div>
  )
}

export default ForgotPasswordPage
