import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useState } from "react";
import { signOutUserStart, signOutUserSuccess, signOutUserFailure} from '../redux/user/userSlice.js';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const {currentUser} = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  }
  
  return (
    <>
    <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="flex bg-[#42c8b7] hover:bg-slate-300  gap-2 px-2 py-2.5 rounded-lg items-center cursor-pointer relative " >
        <img className='rounded-full h-6 w-6 md:h-7 md:w-7 object-cover cursor-pointer' src={currentUser.avatar} alt=''/>
        <div className='text-sm sm:text-lg '> {currentUser.username.split(' ')[0]} </div>
        { !isOpen ? <SlArrowDown className='' /> : <SlArrowUp className=''/>}
        { isOpen && 
           <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="right-[0px] md:left-[0px] absolute top-[47px] bg-slate-100 flex flex-col rounded-xl w-40 sm:w-50 z-50 ">
              <div className="">
                <div className="p-1 border-s-black bg-slate-200 dark:bg-slate-700 dark:rounded-none rounded-lg"></div>
                <Link to='/profile'>
                  <div onClick={() => setIsOpen(false)} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg">Profile</div>
                </Link>
                <Link to={'/search'}>
                  <div onClick={() => setIsOpen(false)} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg">Buy Items</div>
                </Link>
                <Link to='/create-ad'>
                  <div onClick={() => setIsOpen(false)} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg">Sell Items</div>
                </Link>
                <Link to='/my-ads'>
                  <div onClick={() => setIsOpen(false)} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg">My Ads</div>
                </Link>
                <Link to='/sign-in'>
                <div onClick={handleSignOut} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg">Log Out</div>
                </Link>
              </div>
           </div>
        }
    </div>
    </>
  )
}
