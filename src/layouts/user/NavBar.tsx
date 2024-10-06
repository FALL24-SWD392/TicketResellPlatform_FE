// import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  // DropdownMenu,
  // Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  PopoverContent,
  PopoverTrigger,
  Popover,
  Input,
  DropdownMenu,
  Avatar
} from '@nextui-org/react'
import { Logo, SignInForm } from 'src/Components'
import { CiMenuBurger } from 'react-icons/ci'
import { NavLink, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { Login } from 'src/pages'
import { getRefreshTokenFromLS } from 'src/utils/auth'
import { useMutation } from '@tanstack/react-query'
import authAPI from 'src/apis/auth.api'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'

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

  const content = <PopoverContent className='w-[400px]'>{() => <Login />}</PopoverContent>
  const { setIsAuthenticated, isAuthenticated, setProfile, profile, setIsStaff } = useContext(AppContext)
  const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: (refresh_token: string) => authAPI.logout({ refresh_token }),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      setIsStaff(false)
    },
    onError: () => {
      // console.log(error)
    }
  })
  const handleLogout = () => {
    const refresh_token = getRefreshTokenFromLS()
    logoutMutation.mutate(refresh_token)
    navigate('/')
  }
  return (
    <div className='nav-bar'>
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
          <NavbarItem className='hidden lg:flex'>
            {/* <NavLink to={path.login} className='text-white-light'>
              Login
            </NavLink> */}
          </NavbarItem>
          {!isAuthenticated ? (
            <div className='flex '>
              <Popover key='blur' size='lg' offset={10} placement='left-start' backdrop='blur'>
                <PopoverTrigger>
                  <Button color='warning' variant='flat' className='text-white-light'>
                    Login
                  </Button>
                </PopoverTrigger>
                {content}
              </Popover>
            </div>
          ) : (
            <NavbarContent as='div' justify='end'>
              <Dropdown placement='bottom-end'>
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as='button'
                    className='transition-transform'
                    color='secondary'
                    name='Jason Hughes'
                    size='sm'
                    src={profile?.avatar}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem key='profile' className='h-14 gap-2'>
                    <p className='font-semibold'>Signed in as</p>
                    <p className='font-semibold'>{profile?.email}</p>
                  </DropdownItem>
                  <DropdownItem key='settings'>My Settings</DropdownItem>
                  <DropdownItem key='configurations'>Configurations</DropdownItem>
                  <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
                  <DropdownItem key='logout' color='danger'>
                    <button onClick={handleLogout}>Logout</button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          )}
          <NavbarItem>
            <Button as={Link} color='success' href='#' variant='flat'>
              Sell Tickets
            </Button>
          </NavbarItem>
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
