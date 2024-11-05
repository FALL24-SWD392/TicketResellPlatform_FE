import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { UserList } from 'src/@types/users.type';

interface UserListsProps {
  users: UserList[];
  onDeleteUser: (username: string) => void;
}

const UserLists: React.FC<UserListsProps> = ({ users, onDeleteUser }) => {
  // Function to apply styles based on the user status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'VERIFIED':
        return 'status-verified';
      case 'REMOVED':
        return 'status-removed';
      default:
        return 'status-default';
    }
  };

  return (
    <Table aria-label='User List Table'>
      <TableHeader>
        <TableColumn>Username</TableColumn>
        <TableColumn>Email</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Rating</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <span className={getStatusBadgeClass(user.status)}>{user.status}</span>
            </TableCell>
            <TableCell>{user.rating}</TableCell>
            <TableCell>
              <Button isIconOnly className='text-green-500 bg-green-100' title='Edit'>
                <FaEdit />
              </Button>
              <Button
                isIconOnly
                className='text-red-500 bg-red-100 ml-2'
                title='Delete'
                onClick={() => user.username && onDeleteUser(user.username)}
              >
                <FaTrashAlt />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserLists;
