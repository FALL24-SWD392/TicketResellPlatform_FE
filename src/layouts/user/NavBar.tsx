// import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  // DropdownItem,
  // DropdownTrigger,
  // Dropdown,
  // DropdownMenu,
  // Avatar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button
} from '@nextui-org/react'
import { Logo } from 'src/Components'
import { CiMenuBurger } from 'react-icons/ci'

const NavBar = () => {
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

  return (
    <div className='nav-bar'>
      <Navbar isBordered isBlurred={false} className='bg-transparent ' maxWidth='2xl'>
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
          <NavbarItem >
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
            <Link href='#' className='text-white-light'>
              Login
            </Link>
          </NavbarItem>
          <NavbarItem className='hidden lg:flex'>
            <Button as={Link} color='warning' href='#' variant='flat'>
              Signup
            </Button>
          </NavbarItem>
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
