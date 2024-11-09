import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { User } from 'src/@types/users.type'
import { getProfileFormLS } from 'src/utils/auth'

type Props = {
    profile: User | null
    handleLogout: () => void
}
const AvatarButton = ({...props}: Props) => {
  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Avatar isBordered as='button' className='transition-transform' color='secondary' name='Jason Hughes' size='sm' src={localStorage.getItem("avatar") || getProfileFormLS()?.avatar} />
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownItem key='profile' className='h-14 gap-2'>
          <p className='font-semibold'>Signed in as</p>
          <p className='font-semibold'>{props.profile?.email}</p>
        </DropdownItem>
        <DropdownItem key='settings'>
          <Link to="/me">My Profile</Link>
        </DropdownItem>
        <DropdownItem key='changepassword'>
          <Link to="/change-password">Change Password</Link>
        </DropdownItem>
        <DropdownItem key='resetpassword'>
          <Link to="/reset-password">Reset Password</Link>
        </DropdownItem>
        <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
        <DropdownItem key='logout' color='danger'>
          <button onClick={props.handleLogout}>Logout</button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
export default AvatarButton
