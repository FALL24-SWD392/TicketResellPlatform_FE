import { useState, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import authAPI from 'src/apis/auth.api'
import { useMutation } from '@tanstack/react-query'
import { ListBaseResponse } from 'src/@types/response'
import { UserList } from 'src/@types/users.type'
import { debounce } from 'lodash'
import { toast } from 'react-toastify'
import UserLists from 'src/Components/users/UserLists'
import CreateUser from 'src/Components/users/CreateUser'
import SidebarStaff from 'src/layouts/staff/SidebarStaff'

function ManagerUsersForStaff() {
  const [users, setUsers] = useState<ListBaseResponse<UserList>>({
    status: 100,
    message: '',
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: []
  })
  const [search, setSearch] = useState<string>('')
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false)

  const getAllUserMutation = useMutation({
    mutationKey: ['getUsers'],
    mutationFn: () => authAPI.GetAllUserForStaff(),
    onSuccess: (data) => setUsers(data.data),
    onError: (error: any) => {
      // Check for 403 error
      if (error?.response?.status === 403) {
        toast.error('You do not have permission to view the users.')
      } else {
        console.error(error)
      }
    }
  })

  useEffect(() => {
    getAllUserMutation.mutate()
  }, [])

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationKey: ['deleteUsers'],
    mutationFn: (body: { username?: string }) => authAPI.DeleteUser(body),
    onSuccess: (data) => {
      toast.success(data.data.message)
      getAllUserMutation.mutate() // Refresh user list after deletion
    },
    onError: (error: any) => {
      if (error?.response?.status === 403) {
        toast.error('You are not authorized to delete this user.')
      } else {
        console.error(error)
      }
    }
  })

  // Search user by username mutation
  // const getUserByNameMutation = useMutation({
  //   mutationKey: ['getUserByName'],
  //   mutationFn: (username?: string) => authAPI.GetUserByName(username),
  //   onSuccess: (data) => setUsers(data.data),
  //   onError: (error: any) => {
  //     if (error?.response?.status === 403) {
  //       toast.error('You do not have permission to search users.')
  //     } else {
  //       console.error(error)
  //     }
  //   }
  // })

  // Handle delete user
  const handleDeleteUser = (username: string) => {
    deleteUserMutation.mutate({ username })
  }

  // Handle search input change
  // const handleSearch = debounce((username: string) => {
  //   if (username.trim() === '') {
  //     getAllUserMutation.mutate() // Fetch all users if search is empty
  //   } else {
  //     getUserByNameMutation.mutate(username)
  //   }
  // }, 300)

  // Handle save after creating new user
  const handleSaveUser = () => {
    getAllUserMutation.mutate() // Refresh user list after creating user
    setIsCreateUserModalOpen(false) // Close the modal
  }

  return (
    <div className='flex min-h-screen bg-gray-100'>
      {/* Sidebar for Staff */}
      <div className='w-64'>
        <SidebarStaff />
      </div>

      {/* Main Content */}
      <div className='flex-1 p-6 ml-64'>
        <h1 className='text-3xl font-bold mb-6'>User Management for Staff</h1>

        {/* Filter/Search Section */}
        <div className='mb-6 flex justify-between items-center'>
          <div className='flex-grow max-w-lg'>
            <input
              type='text'
              placeholder='Search by username'
              value={search}
              className='border border-gray-300 rounded p-2 w-full sm:max-w-xs md:max-w-md'
              onChange={(e) => {
                setSearch(e.target.value)
                // handleSearch(e.target.value)
              }}
            />
            {/* <Button onPress={() => handleSearch(search)} className='mt-2 w-full sm:w-auto bg-blue-500 text-white'>
              Search
            </Button> */}
          </div>
          <Button color='primary' className='ml-4' onPress={() => setIsCreateUserModalOpen(true)}>
            Add New User
          </Button>
        </div>

        {/* Users List */}
        <div className='p-4 -ml-20'>
          <UserLists users={users.data} onDeleteUser={handleDeleteUser} />
        </div>

        {/* Create New User Modal */}
        {isCreateUserModalOpen && <CreateUser onClose={() => setIsCreateUserModalOpen(false)} onSave={handleSaveUser} />}
      </div>
    </div>
  )
}

export default ManagerUsersForStaff
