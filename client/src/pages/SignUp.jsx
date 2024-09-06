import { useState } from 'react'
import {FaEye} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import OAuth from '../components/OAuth';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value});
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch('/api/auth/signup',      
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      );
      const data = await res.json(); 
      if (data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }    
      setLoading(false);
      setError(null);

      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };


  return (
    <section className='bg-gray-50 pb-12 pt-4  dark:bg-slate-800 min-h-fit flex items-center justify-center'>
      {/* SignUP container */}
      <div className='bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl mt-3 px-2 py-3 items-center'>
        {/* form container */}
          <div className="md:w-1/2 px-8">
            <div className="text-center">
            <h2 className='font-bold text-2xl text-[#42c8b7] uppercase '> Sign Up</h2>
            <p className='text-sm mt-4 text-[#42c8b7]'> New User? Create an Account first</p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
              <input onChange={handleChange} className='p-2 mt-8 rounded-xl border' type="text" id='username' placeholder='Full Name' required />
              <input onChange={handleChange} className='p-2 mt-3 rounded-xl border' type="email" id='email' placeholder='Email' required/>
              <div className="relative">
                <input onChange={handleChange} className='p-2 mt-3 mb-3 rounded-xl border w-full' type='password' id="password" placeholder='Password' required />
                <FaEye className='absolute top-4 right-3 fill-slate-500 cursor-pointer translate-y-1/2'/>
              </div>
              <button disabled={loading} className=' bg-[#42c8b7] uppercase hover:scale-105 duration-300 rounded-xl p-2 text-white'>{loading ? 'Loading...' : 'sign up'}</button>
            </form>

            {error && <p className= ' mt-2 text-red-500 '>{error && "User already exists with this Email !"}</p>}

            <>
            <div className="mt-10 grid grid-cols-3 items-center text-gray-500">
              <hr className='border-gray-500'/>
              <p className='text-center text-sm'>OR</p>
              <hr className='border-gray-500'/>
            </div>

            <OAuth/>

            <div className='border-b border-gray-400 py-3'></div>

            <div className="text-xs flex justify-between items-center mt-3 ">
              <p>Already have an account?</p>
              <Link to={'/sign-in'}>
              <button className='hover:scale-110 duration-300 py-2 px-5 bg-white border rounded-xl'>Login</button>
              </Link>
            </div>
            </>

          </div>

          {/* image-container */}
          <div className="md:w-1/2 hidden sm:block ">
            <img className='rounded-2xl' src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg" alt="" />
          </div>
      </div>
    </section>
  )
}

export default SignUp