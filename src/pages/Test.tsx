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
const Test = () => {
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
      <Navbar isBordered isBlurred={false} className='bg-transparent'>
        <NavbarContent className='sm:hidden' justify='start'>
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className='sm:hidden pr-3' justify='center'>
          <NavbarBrand>
            {/* <Logo /> */}
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
          <NavbarItem>
            <Link color='foreground' href='#'>
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href='#' aria-current='page' className='text-white-light'>
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className='text-white-light' href='#'>
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Link href='#' className='text-white-light'>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color='warning' href='#' variant='flat'>
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
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
export default Test
