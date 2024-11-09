import { onSnapshot } from '@firebase/firestore'
import { collection } from '@firebase/firestore'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { User } from 'src/@types/users.type'
import { ErrorResponse } from 'src/@types/utils.type'
import authAPI from 'src/apis/auth.api'
import userAPI from 'src/apis/user.api'
import { SignInForm } from 'src/Components'
import { AppContext } from 'src/context/app.context'
import { getProfileFormLS } from 'src/utils/auth'
import chatapp from 'src/utils/chatapp.config'
import { addDocument } from 'src/utils/chatapp.service'
import { LoginSchema, LoginSchemaYup } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

export type FormData = LoginSchema
const LoginPage = () => {
  const navigate = useNavigate()
  const { setIsAuthenticated } = useContext(AppContext)
  const {
    register,
    handleSubmit,
    formState: {}
  } = useForm<FormData>({
    resolver: yupResolver(LoginSchemaYup)
  })

  const [loginError, setLoginError] = useState<string>('')

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => {
      return authAPI.login(body)
    }
  })
  const user: User = JSON.parse(localStorage.getItem('profile') || '{}')
  useEffect(() => {
    const db = chatapp.firestore
    const userQuery = collection(db, 'users')
    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data())
      let enableAdd = true
      if (user) {
        for (const item of data) {
          if (item.email === user.email) {
            enableAdd = false
            break
          }
        }
      }
      enableAdd && user && addDocument('users', user)
    })
    return () => unsubscribe()
  }, [user])
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        setIsAuthenticated(true)
        if (getProfileFormLS()?.scope === 'ADMIN') {
          toast.success(data.data.message)
          navigate('/admin')
        } else if (getProfileFormLS()?.scope === 'STAFF') {
          toast.success(data.data.message)
          navigate('/staff')
        } else {
          toast.success(data.data.message)
        }
        toast.success(data.data.message)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const errors = error.response?.data.errors
          setLoginError(errors?.username as string)
          toast.error(error.message)
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
