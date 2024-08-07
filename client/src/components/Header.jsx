import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dropdown from './Dropdown';
import DarkModeToggle from './DarkModeToggle';

export default function Header() {
  const { currentUser } = useSelector(state => state.user); 
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    //we want to get the url, use method in react 
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`search?${searchQuery}`);
    // Now if we write in search form it reflects to url of browser But changes made directly to url of browser, doesnt get reflected to our form because we dont have a useEffect so that each time url change to be able to change search from
    // add useEffect
  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    // last time we set that this time we want to get that
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search]);
  

  return (
    <header className='bg-slate-200 shadow-md dark:bg-slate-700'>
        <div className='flex flex-row justify-between items-center px-1 sm:px-2 md:px-28 py-3 mx-auto'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer rounded-lg px-1 py-3 md:px-4 md:py-3 text-[#42c8b7]'>
            <span>KampusBazaar</span>
            </h1>
            </Link>

           
              <Link to='/search'>
              <div className=" cursor-pointer bg-[#42c8b7] rounded-lg px-1 py-2 md:px-4 md:py-3 text-white uppercase">
                  buy now
              </div>
              </Link>
              <Link to='/create-ad'>
              <div className="cursor-pointer bg-[#42c8b7] rounded-lg px-1 py-2 md:px-4 md:py-3 text-white uppercase">
                  sell items
              </div>
              </Link>
          

          
            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg items-center hidden md:flex md:w-5/12'>
                <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search Items' className='bg-transparent focus:outline-none w-24 sm:w-full' />
                <button>
                    <FaSearch className="text-slate-600 cursor-pointer"/>
                </button>  
            </form>
        
            
            {/* <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center md:w-5/12'>
                <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" placeholder='Search Items' className='bg-transparent focus:outline-none w-24 sm:w-full' />
                <button>
                    <FaSearch className="text-slate-600 cursor-pointer"/>
                </button>  
            </form> */}


            <DarkModeToggle/>

            {currentUser ?
            <Dropdown/>
            :
            <Link to='/sign-in'>
            <button className='font-semibold cursor-pointer uppercase bg-[#42c8b7] rounded-lg px-2 py-2 md:px-6 md:py-3 text-white hover:scale-105 duration-300'>
                login
            </button>
            </Link>
            }

        </div> 
    </header>
  )
}











