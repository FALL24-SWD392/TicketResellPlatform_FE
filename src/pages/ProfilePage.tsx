import React, { useState, useEffect } from 'react'
import { ProfileUser } from 'src/Components'
import { NavLink, Route, Routes } from 'react-router-dom'
import MembershipPage from './MembershipPage'
import TransactionsPage from './TransactionsPage'

const ProfilePage: React.FC = () => {
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
            to='transaction'
          >
            Transactions
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
            Your Tickets
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
          <Route path='transaction' element={<TransactionsPage/>}/>
        </Routes>
      </main>

      
    </div>
  )
}

export default ProfilePage
