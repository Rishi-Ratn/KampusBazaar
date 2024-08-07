import React from 'react';
import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className='w-full bg-slate-200 flex justify-between items-center py-2 rounded-lg px-4 dark:bg-slate-700 '>
      <div className='flex-1 flex justify-center items-center'>
        <span className='text-xs font-semibold text-slate-600 dark:text-slate-200'>
          &copy; 2024 KampusBazaar |  
        </span>
        <span className='text-xs font-semibold text-slate-600 dark:text-slate-200 flex items-center mx-1'>
          Made with <span className='inline-block mx-1'><FaHeart className='text-teal-500' /></span> by a Y21
        </span>
      </div>
      <div className='text-[7px] font-semibold text-slate-400'>
      &copy; Rishi Ratn
      </div>
    </div>
  );
}

