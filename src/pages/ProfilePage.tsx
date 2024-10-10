import React, { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState(() => localStorage.getItem('firstName') || 'Jane')
  const [lastName, setLastName] = useState(() => localStorage.getItem('lastName') || 'Ferguson')
  const [email, setEmail] = useState(() => localStorage.getItem('email') || 'your.email@mail.com')
  const [profession, setProfession] = useState(() => localStorage.getItem('profession') || '')
  const [bio, setBio] = useState(() => localStorage.getItem('bio') || '')
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [avatar, setAvatar] = useState('https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/462342722_1963143764129124_723048743272130864_n.jpg?stp=dst-jpg_p526x296&_nc_cat=106&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeGynqeYA9W3G8e9WOA7gmHnLtdSCCvBgKMu11IIK8GAo1hVhtQRqKw-ATR3bmq9ufYc-K1JlUm_RGWoA0t25eGC&_nc_ohc=-a5KFm5Ym-sQ7kNvgHRiOwx&_nc_ht=scontent.fhan2-5.fna&_nc_gid=AADLh41is271IJR1cJTyKe4&oh=00_AYCzg4YpgTDFgO0Th-E_L69Koc4cVJE5I1ZXs9C8tsnz-w&oe=670C860C')

  useEffect(() => {
    
    const storedAvatar = localStorage.getItem('avatar')
    if (storedAvatar) {
      setAvatar(storedAvatar)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('firstName', firstName)
    localStorage.setItem('lastName', lastName)
    localStorage.setItem('email', email)
    localStorage.setItem('profession', profession)
    localStorage.setItem('bio', bio)
    localStorage.setItem('avatar', avatar) 
    alert('Profile information has been saved successfully!')
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]'>
      <aside className='hidden py-4 md:w-1/3 lg:w-1/4 md:block'>
        <div className='sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12'>
          <h2 className='pl-3 mb-4 text-2xl font-semibold'>My Settings</h2>
          <a href='#' className='flex items-center px-3 py-2.5 font-bold bg-white text-indigo-900 border rounded-full'>
            Public Profile
          </a>
          <a href='#' className='flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'>
            Account Settings
          </a>
          <a href='#' className='flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'>
            Notifications
          </a>
          <a href='#' className='flex items-center px-3 py-2.5 font-semibold hover:text-indigo-900 hover:border hover:rounded-full'>
            PRO Account
          </a>
        </div>
      </aside>

      <main className='w-full min-h-screen py-1 md:w-2/3 lg:w-3/4'>
        <div className='p-2 md:p-4'>
          <div className='w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg'>
            <h2 className='pl-6 text-2xl font-bold sm:text-xl'>Public Profile</h2>

            <div className='grid max-w-2xl mx-auto mt-8'>
              <div className='flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0'>
                <img
                  className='w-40 h-40 p-2 border-2 border-indigo-500 rounded-full object-cover ring-2 ring-indigo-300 dark:ring-indigo-500 cursor-pointer hover:opacity-80'
                  src={avatar} 
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
                  <input
                    type='file'
                    id='fileInput'
                    className='hidden'
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className='items-center mt-8 sm:mt-14 text-[#202142]'>
                <div className='flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6'>
                  <div className='w-full'>
                    <label htmlFor='first_name' className='block mb-2 text-sm font-medium text-indigo-900'>
                      Your first name
                    </label>
                    <input
                      type='text'
                      id='first_name'
                      className='bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
                      placeholder='Your first name'
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className='w-full'>
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
                  </div>
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className='mb-2 sm:mb-6'>
                  <label htmlFor='profession' className='block mb-2 text-sm font-medium text-indigo-900'>
                    Profession
                  </label>
                  <input
                    type='text'
                    id='profession'
                    className='bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5'
                    placeholder='Your profession'
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    required
                  />
                </div>

                <div className='mb-6'>
                  <label htmlFor='bio' className='block mb-2 text-sm font-medium text-indigo-900'>
                    Bio
                  </label>
                  <textarea
                    id='bio'
                    rows={4}
                    className='block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500'
                    placeholder='Write your bio here...'
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </div>

                <div className='flex justify-end'>
                  <Button radius='md' size='md' color='success' onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isImageModalOpen && (
        <div
          className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-10 backdrop-blur-sm'
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className='relative p-5 bg-white rounded-lg' onClick={(e) => e.stopPropagation()}>
            <img
              className='w-[600px] h-[750px] p-2 border-2 border-indigo-400 rounded-lg object-cover'
              src={avatar}
              alt='Profile'
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
