import React from 'react';
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

const HeaderAdmin: React.FC = () => {
  const items = [
    { key: 'edit', label: 'Edit file' },
    { key: 'logout', label: 'Log Out' }
  ];

  return (
    <>
      <header className='flex justify-between items-center p-4 shadow ' style={{ backgroundColor: '#F4F4F5' }}>
        <h1 className='flex-grow text-center font-bold' style={{ color: '#481878' }}>
          Admin Dashboard
        </h1>
        <div className='flex items-center space-x-4 px-10'>
          <Dropdown>
            <DropdownTrigger>
              <Button className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg' radius='full'>
                Profiles
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' items={items}>
              {(item) => (
                <DropdownItem
                  key={item.key}
                  color={item.key === 'delete' ? 'danger' : 'default'}
                  className={item.key === 'delete' ? 'text-danger' : ''}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>

          <Button className='bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'>
            Notifications
          </Button>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
