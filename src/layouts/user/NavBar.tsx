import { NavLink, useNavigate } from 'react-router-dom'
import { User } from 'src/@types/users.type'
import Logo from 'src/Components/Logo'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react'
const NavBar = ({ user, logout }: { user?: User | null; logout?: () => void }) => {
  const nav = useNavigate()
  return (
    <>
      <div className="nav-bar sticky">
        <div className="w-full flex items-center justify-between h-16 px-40 bg-none">
            <Logo />
            <div className="flex justify-between w-3/6">
                <NavLink to="/" className="flex items-center cursor-pointer text-white-light hover:text-white-lightHover text-xl">Home</NavLink>
                <NavLink to="/" className="flex items-center cursor-pointer text-white-light hover:text-white-lightHover text-xl">Your Ticket</NavLink>
                <NavLink to="/" className="flex items-center cursor-pointer text-white-light hover:text-white-lightHover text-xl">Your Order</NavLink>
                <NavLink to="/" className="flex items-center cursor-pointer text-white-light hover:text-white-lightHover text-xl">Chat</NavLink>
                <button className='flex items-center cursor-pointer text-white-light hover:text-white-lightHover text-xl' onClick={() => nav(`/${user ? "cart": "login"}`)}>Log In</button>
                <button className='flex item-center cursor-pointer bg-green-normal text-white-light rounded-md px-4 py-2 text-xl' onClick={logout}>Sell Ticket</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default NavBar
