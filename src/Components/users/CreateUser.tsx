import { Button, Input } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import authAPI from 'src/apis/auth.api';

// Define validation schema
const CreateUserSchemaYup = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  role: yup.string().required('Role is required'),
});

export type FormDataCreateUser = yup.InferType<typeof CreateUserSchemaYup>;

interface CreateUserProps {
  onClose: () => void;
  onSave: () => void;
}

const initForm = {
  username: '',
  password: '',
  email: '',
  role: 'STAFF',
  status: 'VERIFIED',
  typeRegister: 'SYSTEM',
  avatar: '',
  rating: '10',
  reputation: '90',
};

const CreateUser: React.FC<CreateUserProps> = ({ onClose, onSave }) => {
  const [form, setForm] = useState<typeof initForm>(initForm);
  const createUserMutation = useMutation({
    mutationFn: (body: typeof initForm) => authAPI.CreateUser(body),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const bodyCreateStaff = {
      ...form,
      role: 'STAFF',
      status: 'VERIFIED',
      typeRegister: 'SYSTEM',
      avatar: '',
      rating: '10',
      reputation: '90',
    };

    createUserMutation.mutate(bodyCreateStaff, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        onSave(); // Refresh the user list and close the modal
        onClose(); // Close the modal after saving
      },
      onError: (error) => {
        console.error(error);
        toast.error('Error creating user');
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-black-light rounded-lg w-full max-w-md p-6 shadow-lg relative">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <Input
              onChange={(e) => { setForm((prev) => ({ ...prev, username: e.target.value })) }}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              onChange={(e) => { setForm((prev) => ({ ...prev, password: e.target.value })) }}
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              onChange={(e) => { setForm((prev) => ({ ...prev, email: e.target.value })) }}
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter email"
            />
          </div>
          <div className="flex justify-end">
            <Button color="danger" className="mr-2" onPress={onClose}>Cancel</Button>
            <Button type="submit" color="primary">Create User</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
