// src/layouts/staff/SidebarStaff.tsx
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const SidebarStaff = () => {
  return (
    <div className="bg-[#fcfcfd] text-white w-64 h-screen fixed p-4 shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>
      <nav>
        <ul className="space-y-[30px]">
          <li>
            <Link to="/staff/dashboard">
              <Button className="w-full flex items-center gap-3 text-left text-lg text-gray-400 hover:text-white">
                🏠 Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/user-list">
              <Button className="w-full flex items-center gap-3 text-left text-lg text-gray-400 hover:text-white">
                📁 User List
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/report">
              <Button className="w-full flex items-center gap-3 text-left text-lg text-gray-400 hover:text-white">
                📝 Report
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/ticketApproval">
              <Button className="w-full flex items-center gap-3 text-left text-lg text-gray-400 hover:text-white">
              📊 Ticket Approval
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/staff/teams">
              <Button className="w-full flex items-center gap-3 text-left text-lg text-gray-400 hover:text-white">
                👥 Transactions
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <Button className="w-full mt-10 text-left text-red-500">Log Out</Button>
      </div>
    </div>
  );
};

export default SidebarStaff;
