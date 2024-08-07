import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import { FaRupeeSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [contact,setContact] = useState(false);
  const params = useParams();
  const  { currentUser } = useSelector((state)=>state.user);
  useEffect(()=>{
    const fetchListing = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if(data.success===false){
                setError(true);
                setLoading(false);
                return;
            }
            setListing(data);
            setLoading(false);
            setError(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }   
    }
    fetchListing();
  },[params.listingId]);


  return (
    <main className='flex flex-col items-center mx-3'>
        {/* {loading && <p>Loading...</p>}
        {error && <p>Something went wrong</p> } */}
        {listing && !loading && !error && (
        <>
          <div className="flex w-full flex-col md:flex-row py-3 gap-y-5 md:gap-x-7 rounded-lg mt-8">
            <div className="w-full md:w-7/12 bg-slate-200 rounded-xl">
              <Swiper navigation>
                {listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div
                      className="h-[550px] bg-transparent flex items-center justify-center bg-slate-300 rounded-xl p-4">
                      <img src={url} alt='listing' className='object-contain h-full rounded-xl '/>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="w-full md:w-5/12 p-5 bg-slate-200 rounded-xl text-center">
              {/* Add your information here */}
              <h2 className="text-lg font-semibold mb-4 bg-[#42c8b7] w-full text-white p-2 rounded-xl">{listing.title}</h2>
              <div className="flex flex-col mt-5 ">
                <span className='text-slate-900 text-lg font-semibold '>Description: </span>
                <p className='text-slate-800 text-base ' >{listing.description}</p>
              </div>


              <div className="flex flex-row items-center text-center mt-8 gap-9">
                <p className="mr-2 text-slate-900 text-lg font-semibold flex-1 ">PRICE:</p>
                <div className="p-3 w-full bg-slate-400 text-white uppercase font-semibold rounded-lg flex flex-1 items-center text-xl">
                  <FaRupeeSign className="mr-1" />
                  {listing.price}
                </div>
              </div>


              <div className="flex flex-row gap-4 mt-6 ">
                <div className="flex-1 flex-col ">
                    <p className='text-slate-900 text-base font-medium '>Category</p>
                    <p className=' p-2 bg-slate-400 text-white uppercase font-semibold rounded-lg' >{listing.category}</p>
                </div>

                <div className="flex-1 flex-col ">
                    <p className='text-slate-900 text-base font-medium '>Condition</p>
                    <p className=' p-2 bg-slate-400 text-white uppercase font-semibold rounded-lg' >{listing.condition}</p>
                </div>
              </div>
              

              <div className="flex flex-row gap-4 mt-4 mb-5">
                <div className="flex-1 flex-col ">
                  <p className='text-slate-900 text-base font-medium '>Location</p>
                    {
                      listing.location === 'insideIITK' ? 
                        <p className='p-2 bg-green-500 text-white uppercase font-semibold rounded-lg' >{listing.location}</p>
                       :  <p className='p-2 bg-red-500 text-white uppercase font-semibold rounded-lg' >{listing.location}</p>
                    }
                </div>

                <div className="flex-1 flex-col ">
                <p className='text-slate-900 text-base font-medium '>Price is</p>
                    {
                      listing.priceType === 'negotiable' ? 
                        <p className='p-2 bg-green-500 text-white uppercase font-semibold rounded-lg' >{listing.priceType}</p>
                       :  <p className='p-2 bg-red-500 text-white uppercase font-semibold rounded-lg' >{listing.priceType}</p>
                    }
                </div>
              </div>


              { currentUser && listing.userRef !== currentUser._id && !contact &&  (
                <button onClick={()=>setContact(true)} className="bg-white border rounded-xl hover:scale-105 cursor-pointer uppercase duration-300 py-4 px-5 mt-8 text-base border-b border-gray-400 w-full">Make an Offer</button>
              )}     
              { contact && <Contact listing={listing}/> }

              
              {/* Add more details as needed */}
            </div>
          </div>
        </>
      )}
    </main>
  )
}
