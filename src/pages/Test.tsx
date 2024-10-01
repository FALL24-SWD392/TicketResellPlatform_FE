import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
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
      <Navbar disableAnimation isBordered >
        <NavbarContent className='sm:hidden' justify='start'>
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarContent className='sm:hidden pr-3' justify='center'>
          <NavbarBrand>
            <Logo />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarBrand>
            <Logo />
            <p className='font-bold text-inherit'>ACME</p>
          </NavbarBrand>
          <NavbarItem>
            <Link color='foreground' href='#'>
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href='#' aria-current='page' color='warning'>
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href='#'>
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify='end'>
          <NavbarItem className='hidden lg:flex'>
            <Link href='#'>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color='warning' href='#' variant='flat'>
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu style={{ color: 'white' }}>
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
