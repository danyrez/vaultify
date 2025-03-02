import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 bg-gray-200'>
        <Outlet />
      </div>
    </div>
  );
}
