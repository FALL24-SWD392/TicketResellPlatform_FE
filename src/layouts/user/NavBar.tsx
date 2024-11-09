// import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from '@nextui-org/react'
import { AvatarButton, Logo } from 'src/Components'
import { CiMenuBurger } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { clearLocalStorage, getRefreshTokenFromLS } from 'src/utils/auth'
import authAPI from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import path from 'src/constants/path'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { RxAvatar } from 'react-icons/rx'
import { BsChatLeftTextFill } from 'react-icons/bs'

interface Props {
  isBlur?: boolean
  className?: string
  _id?: string
  name?: string
}

const NavBar = ({ ...props }: Props) => {
  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'Analytics',
    'System',
    'Deployments',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out'
  ]

  const { setIsAuthenticated, isAuthenticated, setProfile, profile } = useContext(AppContext)
  const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: (token: string) => authAPI.logout({ token }),
    onSuccess: (data) => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.success(data.data.message)
      clearLocalStorage()
    },
    onError: () => {
      toast.error('Logout failed')
    }
  })

  const handleLogout = () => {
    const refresh_token = getRefreshTokenFromLS()
    logoutMutation.mutate(refresh_token)
    
    navigate('/')
  }

  return (
    <div className='bg-gradient_header w-full'>
      <Navbar isBordered isBlurred={props.isBlur || false} className='bg-transparent' maxWidth='2xl'>
        <NavbarContent className='sm:hidden' justify='start'>
          <NavbarMenuToggle icon={<CiMenuBurger className='text-black-darker text-[30px]' />} />
        </NavbarContent>

        <NavbarContent className='sm:hidden pr-3' justify='center'>
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex '>
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex ' justify='center'>
          <NavbarItem>
            <Link className='text-black-darker' aria-current='page' href='/'>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' aria-current='page' className='text-black-darker'>
              Your Order
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-black text' href='/my-ticket'>
              Your Tickets
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-black text' href='/chat'>
              Your Chats
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-black text' href='/create-ticket'>
              Create Ticket
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-black' href='#'>
              Report
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-black' href='/subscriptions'>
              Pricing
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-black' href={path.blog}>
              Blog
            </Link>
          </NavbarItem>
        </NavbarContent>
        
        <NavbarContent justify='end'>
          {!isAuthenticated ? (
            <NavbarContent as='div' justify='end'>
              <button>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <button>
                <BsChatLeftTextFill />
              </button>
              <NavbarItem className='hidden lg:flex'>
                <Link className='text-white-light' aria-current='page' href={path.login}>
                  <RxAvatar color='black' size='24' />
                </Link>
              </NavbarItem>
            </NavbarContent>
          ) : (
            <NavbarContent as='div' justify='end'>
              <button>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <button>
                <BsChatLeftTextFill />
              </button>
              <AvatarButton profile={profile} handleLogout={handleLogout} />
            </NavbarContent>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  )
}
export default NavBar
