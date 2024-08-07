import {FaEye} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure} from '../redux/user/userSlice.js';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(file){
      handlefileUpload(file);
    }
  }, [file]);

  const handlefileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      setFilePerc(Math.round(progress));
    },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>{
        setFormData({...formData, avatar: downloadURL});
      })
    }
  );
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });     // i.e based on id of the input, we're gonna extract the changes and put it inside the form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      setUpdateSuccess(false);
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success===false) {
        dispatch(updateUserFailure(data.message));
        return;
      };
      //if everything is ok 
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <section className='bg-gray-50 min-h-fit flex items-center justify-center dark:bg-slate-800 pb-12'>

      <div className='bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-3xl mt-3 px-2 py-3 items-center'>
          <div className="px-8 flex flex-col">
            <div className="text-center">
              <h2 className='font-bold text-2xl text-[#42c8b7] uppercase '>Your Profile</h2>
              <p className='text-xs mt-2 mb-6 text-[#42c8b7]'>Buyer will contact you through your Registered Email</p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
              <input onChange={(e)=>setFile(e.target.files[0])} hidden type="file" ref={fileRef} accept='/image/*'/>
              <img  src={formData.avatar || currentUser.avatar} onClick={()=>fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center 'alt="" />
              <p className='text-sm self-center'>
                {
                  fileUploadError ? <span className='text-red-700'>Error Image Upload: Image must be less than 2MB</span> : 
                  filePerc > 0 && filePerc < 100 ? <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span> :
                  filePerc === 100 ? <span className='text-green-700'>Image Successfully uploaded!</span> : ''
                }
              </p>
              <input onChange={handleChange} className='p-2 mt-1 rounded-xl border text-[#42c8b7] font-bold ' type="text" id='username' placeholder='Full Name' defaultValue={currentUser.username} />
              <input onChange={handleChange} className='p-2 mt-1 rounded-xl border text-[#42c8b7] font-bold '  type="email" id='email' placeholder='Email' defaultValue={currentUser.email}/>
              <div className="relative">
                <input onChange={handleChange} className='p-2 mt-1 mb-3 rounded-xl border w-full' type='password' id="password" placeholder='Password' />
                <FaEye className='absolute top-2 right-3 fill-slate-500 cursor-pointer translate-y-1/2'/>
              </div>
              <button disabled={loading} className=' bg-[#42c8b7] uppercase hover:scale-105 duration-300 rounded-xl p-2 text-white'> {loading ? 'Updating...' : 'Update Profile'}</button>
            </form>

            <p className='text-red-700 mt-1' > {error ? error : ''} </p>
            <p className='text-green-700 mt-1'>{updateSuccess ? 'Profile Updated Successfully!' : ''}</p>

            <div className="mt-3 grid grid-cols-3 items-center text-gray-500">
              <hr className='border-gray-500'/>
              <hr className='border-gray-500'/>
              <hr className='border-gray-500'/>
            </div>

            <Link to='/my-ads'>
            <button className='bg-white border rounded-xl hover:scale-110 duration-300 py-2 px-5 mt-5 text-sm border-b border-gray-400 w-full'>My Ads</button>
            </Link>

            <div className="text-xs flex justify-between items-center mt-1 ">
              <p className='text-[#42c8b7]' >You can see your Posted Ads from here</p>
            </div>

          </div>
      </div>
      
    </section>
  )
}
