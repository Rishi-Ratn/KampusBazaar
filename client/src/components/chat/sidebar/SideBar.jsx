import React from 'react'
import Conversations from './Conversations'

export default function SideBar() {
  return (
    <div className='bg-slate-200 py-3 px-1 rounded-lg h-[400px] flex flex-col'>
      <div className='flex items-center justify-center font-semibold py-3 text-[#42c8b7] '>Your Chats</div>
      <hr className='border-gray-600' />
      <Conversations/>
    </div>
  )
}

// import Conversations from "./Conversations";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;