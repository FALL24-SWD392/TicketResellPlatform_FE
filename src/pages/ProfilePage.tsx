import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import userAPI from 'src/apis/user.api'
import { imageDB } from 'src/firebase'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { ProfileUser } from 'src/Components'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import MembershipPage from './MembershipPage'

const ProfilePage: React.FC = () => {
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
    <div className='bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]'>
      <aside role='tablist' className='hidden py-4 md:w-1/3 lg:w-1/4 md:block'>
        <div className='sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12'>
          <h2 className='pl-3 mb-4 text-2xl font-semibold'>My Settings</h2>
          <NavLink
            role='tab'
            className={({ isActive }) =>
              isActive
                ? 'tab tab-active flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'
                : 'tab flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'
            }
            to=''
          >
            Public Profile
          </NavLink>
          <NavLink
            role='tab'
            className={({ isActive }) =>
              isActive
                ? 'tab tab-active flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'
                : 'tab flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'
            }
            to=''
          >
            Account Setting
          </NavLink>
          <NavLink
            role='tab'
            className={({ isActive }) =>
              isActive
                ? 'tab tab-active flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'
                : 'tab flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'
            }
            to=''
          >
            Notification
          </NavLink>
          <NavLink
            role='tab'
            className={({ isActive }) =>
              isActive
                ? 'tab tab-active flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'
                : 'tab flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'
            }
            to='membership'
          >
            Membership
          </NavLink>
        </div>
      </aside>
      <main className='w-full min-h-[500px] py-1 md:w-2/3 lg:w-3/4'>
        <Routes>
          <Route index element={<ProfileUser />} />
          <Route path='membership' element={<MembershipPage />} />
        </Routes>
      </main>

      
    </div>
  )
}

export default ProfilePage
