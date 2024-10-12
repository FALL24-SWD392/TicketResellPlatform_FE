// import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from '@nextui-org/react'
import { AvatarButton, Logo } from 'src/Components'
import { CiMenuBurger } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { getRefreshTokenFromLS } from 'src/utils/auth'
import authAPI from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import path from 'src/constants/path'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

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
    mutationFn: (refresh_token: string) => authAPI.logout(refresh_token),
    onSuccess: (data) => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.success(data.data.message)
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
    <div className='nav-bar bg-transparent backdrop-blur-sm'>
      <Navbar isBordered isBlurred={props.isBlur || false} className='bg-transparent' maxWidth='2xl'>
        <NavbarContent className='sm:hidden' justify='start'>
          <NavbarMenuToggle icon={<CiMenuBurger className='text-white-light text-[30px]' />} />
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
            <Link className='text-white-light' aria-current='page' href='#'>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href='#' aria-current='page' className='text-white-light'>
              Your Order
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-white-light text' href='#'>
              Your Tickets
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-white-light' href='#'>
              Report
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-white-light' href='#'>
              Overview
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify='end'>
          {!isAuthenticated ? (
            <NavbarItem className='hidden lg:flex'>
              <Link className='text-white-light' aria-current='page' href={path.login}>
                Login
              </Link>
            </NavbarItem>
          ) : (
            <NavbarContent as='div' justify='end'>
              <AvatarButton profile={profile} handleLogout={handleLogout} />
            </NavbarContent>
          )}
        </NavbarContent>

        <NavbarMenu className='bg-yellow-light'>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className='w-full' color={index === 2 ? 'warning' : index === menuItems.length - 1 ? 'danger' : 'foreground'} href='#' size='lg'>
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  )
}
export default NavBar
