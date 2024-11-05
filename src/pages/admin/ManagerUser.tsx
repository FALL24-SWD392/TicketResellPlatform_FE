import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import SidebarAdmin from 'src/layouts/admin/SidebarAdmin';
import authAPI from 'src/apis/auth.api';
import { useMutation } from '@tanstack/react-query';
import { ListBaseResponse } from 'src/@types/response';
import { UserList } from 'src/@types/users.type';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';
import UserLists from 'src/Components/users/UserLists';
import CreateUser from 'src/Components/users/CreateUser';

function ManagerUsers() {
  const [users, setUsers] = useState<ListBaseResponse<UserList>>({
    status: 100,
    message: '',
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: [],
  });
  const [search, setSearch] = useState<string>('');
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const getAllUserMutation = useMutation({
    mutationKey: ['getUsers'],
    mutationFn: () => authAPI.GetAllUser(),
    onSuccess: (data) => setUsers(data.data),
    onError: (error) => console.error(error),
  });

  useEffect(() => {
    getAllUserMutation.mutate();
  }, []);

  // Delete user
  const deleteUserMutation = useMutation({
    mutationKey: ['deleteUsers'],
    mutationFn: (body: { username?: string }) => authAPI.DeleteUser(body),
    onSuccess: (data) => {
      toast.success(data.data.message);
      getAllUserMutation.mutate();
    },
    onError: (error) => console.error(error),
  });

  // Search
  const getUserByNameMutation = useMutation({
    mutationKey: ['getUserByName'],
    mutationFn: (username?: string) => authAPI.GetUserByName(search),
    onSuccess: (data) => setUsers(data.data),
    onError: (error) => console.error(error),
  });

  const handleDeleteUser = (body: { username?: string }) => {
    deleteUserMutation.mutate(body);
  };

  const handleSearch = debounce((username: string) => {
    if (username.trim() === '') {
      getAllUserMutation.mutate();
    } else {
      getUserByNameMutation.mutate(username);
    }
  }, 300);

  const handleSaveUser = () => {
    getAllUserMutation.mutate(); // Refresh user list after creating user
    setIsCreateUserModalOpen(false); // Close the modal
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <SidebarAdmin />
      <div className='flex-1 p-6 ml-64'>
        <h1 className='text-3xl font-bold mb-6'>User List</h1>

        {/* Filter Section */}
        <div className='mb-2 flex justify-between items-center'>
          <div className='flex-grow'>
            <input
              type='text'
              placeholder='Search by username'
              value={search}
              className='border border-gray-300 rounded p-2 mr-4'
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
            />
            <Button onPress={() => handleSearch(search)} className='bg-blue-500 text-white'>
              Search
            </Button>
          </div>
          <Button color='primary' className='ml-2' onPress={() => setIsCreateUserModalOpen(true)}>
            Add New
          </Button>
        </div>

        {/* Users Table */}
        <div className='p-4 -ml-20'>
          <UserLists users={users.data} onDeleteUser={(username) => handleDeleteUser({ username })} />
        </div>

        {/* Create User Modal */}
        {isCreateUserModalOpen && (
          <CreateUser onClose={() => setIsCreateUserModalOpen(false)} onSave={handleSaveUser} />
        )}
      </div>
    </div>
  );
}

export default ManagerUsers;
