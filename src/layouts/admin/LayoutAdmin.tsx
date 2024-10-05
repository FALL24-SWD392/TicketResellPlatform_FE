import React from 'react';
import SidebarAdmin from './SidebarAdmin';
import HeaderAdmin from './HeaderAdmin';

const LayoutAdmin: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <div className="flex-1">
        <HeaderAdmin />
        <div className="p-8" style={{ backgroundColor: '#F4F4F5' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
