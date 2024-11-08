import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import userAPI from 'src/apis/user.api'
import { imageDB } from 'src/firebase'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const ProfileUser = () => {
  const { data } = useQuery({
    queryKey: ['get-profile'],
    queryFn: () => userAPI.getMe()
  })
  const updateProfileMutation = useMutation({
    mutationFn: (body: { avatar: string }) => userAPI.updateProfile(body)
  })

  const [email, setEmail] = useState(`${data?.data.data.email}` || 'your.email@mail.com')
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [avatars, setAvatars] = useState(`${data?.data.data?.avatar}` || 'https://i.pravatar.cc/300')
  console.log(avatars)
  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar')
    if (storedAvatar) {
      setAvatars(storedAvatar)
    }
  }, [])

  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imgRef = ref(imageDB, `images/${v4()}`)
      await uploadBytes(imgRef, event.target.files[0]).then((value) => {
        getDownloadURL(value.ref).then((url) => {
          setAvatars(url)
          updateProfileMutation.mutate({ avatar: url })
          localStorage.setItem('avatar', url)
        })
      })
    }
  }
  return (
    <>
      <div className='p-2 md:p-4'>
        <div className='w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg'>
          <h2 className='pl-6 text-2xl font-bold sm:text-xl'>Public Profile</h2>

          <div className='grid max-w-2xl mx-auto mt-8'>
            <div className='flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0'>
              <img
                className='w-40 h-40 p-2 border-2 border-indigo-500 rounded-full object-cover ring-2 ring-indigo-300 dark:ring-indigo-500 cursor-pointer hover:opacity-80'
                src={avatars}
                alt='Profile'
                onClick={() => setIsImageModalOpen(true)}
              />
              <div className='flex flex-col space-y-5 sm:ml-8'>
                <Button radius='md' size='md' color='primary' onClick={() => document.getElementById('fileInput')?.click()}>
                  Change Picture
                </Button>
                <Button radius='md' size='md' color='secondary' variant='flat'>
                  Delete Picture
                </Button>
                <input type='file' id='fileInput' className='hidden' accept='image/*' onChange={handleChangeImage} />
              </div>
            </div>

            <div className='items-center mt-8 sm:mt-14 text-[#202142]'>
              <div className='flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6'>
                <div className='w-full'>
                  <label htmlFor='first_name' className='block mb-2 text-sm font-medium text-indigo-900'>
                    User Name
                  </label>
                  <p className='text-black-darkHover'>{data?.data.data?.username}</p>
                  {/* <input
                      type='text'
                      id='first_name'
                      className='bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
                      placeholder='Your first name'
                      value={data?.data.data.user.username}
                      
                      required
                    /> */}
                </div>
                {/* <div className='w-full'>
                    <label htmlFor='last_name' className='block mb-2 text-sm font-medium text-indigo-900'>
                      Your last name
                    </label>
                    <input
                      type='text'
                      id='last_name'
                      className='bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
                      placeholder='Your last name'
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div> */}
              </div>

              <div className='mb-2 sm:mb-6'>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-indigo-900'>
                  Your email
                </label>
                <input
                  type='email'
                  id='email'
                  className='bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
                  placeholder='your.email@mail.com'
                  value={email}
                  required
                />
              </div>

              <div className='mb-2 sm:mb-6'>
                <label htmlFor='profession' className='block mb-2 text-sm font-medium text-indigo-900'>
                  Reputaion
                </label>
                <input
                  type='text'
                  id='profession'
                  className='bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
                  placeholder='Your profession'
                  value={data?.data.data.reputation}
                  required
                />
              </div>

              <div className='mb-6'>
                <label htmlFor='bio' className='block mb-2 text-sm font-medium text-indigo-900'>
                  Ratting
                </label>
                <p
                  id='bio'
                  className='block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500'
                >
                  {data?.data.data.rating}
                </p>
              </div>

              <div className='flex justify-end'>
                {/* <Button radius='md' size='md' color='success' onClick={handleSave}>
                    Save
                  </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isImageModalOpen && (
        <div
          className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-10 backdrop-blur-sm'
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className='relative p-5 bg-white rounded-lg' onClick={(e) => e.stopPropagation()}>
            <img className='w-[600px] h-[750px] p-2 border-2 border-indigo-400 rounded-lg object-cover' src={avatars} alt='Profile' />
          </div>
        </div>
      )}
    </>
  )
}
export default ProfileUser
