import { useState } from 'react'
import {FaEye} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

function SignIn() {
  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // setLoading(true);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',      
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );
      const data = await res.json(); 
      if (data.success === false){
        // setError(data.message);
        // setLoading(false);
        dispatch(signInFailure(data.message));
        return;
      }    
      // setLoading(false);
      // setError(null);
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      // setLoading(false);
      // setError(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <section className='bg-gray-50 flex items-center justify-center dark:bg-slate-800 pb-12 pt-4 '>
      {/* Login container */}
      <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl mt-3 px-2 py-3 items-center'>


        {/* image-container */}
        <div className="md:w-1/2 hidden sm:block ">
            <img className='rounded-2xl' src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg" alt="" />
          </div>


        {/* form container */}
          <div className="md:w-1/2 px-8">
            <div className="text-center">
            <h2 className='font-bold text-2xl text-[#42c8b7] uppercase '>Login</h2>
            <p className='text-sm font-medium mt-4 text-[#42c8b7]'>Welcome aboard! Log in to get started. </p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input onChange={handleChange} className='p-2 mt-3 rounded-xl border' type="email" id='email' placeholder='Email' required/>
              <div className="">
                <input onChange={handleChange} className='p-2 mt-3 mb-3 rounded-xl border w-full' type='password' id="password" placeholder='Password' required />
                {/* <FaEye className='absolute top-4 right-3 fill-slate-500 cursor-pointer translate-y-1/2'/> */}
              </div>
              <button disabled={loading} className=' bg-[#42c8b7] uppercase hover:scale-105 duration-300 rounded-xl p-2 text-white'> {loading ? 'Loading...' : 'Login'} </button>
            </form>

            {error && <p className= ' mt-2 text-red-500'>{error}</p>}

            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className='border-gray-500'/>
              <p className='text-center text-sm'>OR</p>
              <hr className='border-gray-500'/>
            </div>

            <OAuth/>

            <div className='mt-10 text-sm border-b border-gray-400 py-4'>Forgot your Password?</div>

            <div className="text-xs flex justify-between items-center mt-3 ">
              <p>Dont have an account?</p>
              <Link to={'/sign-up'}>
              <button className='hover:scale-110 duration-300 py-2 px-5 bg-white border rounded-xl'>Register</button>
              </Link>
            </div>
          </div>

          {/* image-container
          <div className="md:w-1/2 hidden sm:block ">
            <img className='rounded-2xl' src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg" alt="" />
          </div> */}
      </div>
    </section>
  )
}

export default SignIn