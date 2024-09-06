import React, { useEffect, useState } from 'react'
import ListingItem from '../ListingItem'
import { Link } from 'react-router-dom';

export default function ListingHomePage() {
  const [recentPosts, setRecentPosts] = useState([]);  

  useEffect(() => {
    const fetchrecentPosts = async (req, res, next) => {
        try {
            const res = await fetch('/api/listing/get?sort=createdAt&order=asc&limit=4');
            const data = await res.json();
            setRecentPosts(data);
        } catch (error) {
            console.log(error);
        }
    };
    fetchrecentPosts();
  },[]);


  return (
    <div className="max-w-[1240px] mx-auto p-3 py-2 pb-4 rounded-lg flex flex-col gap-8 my-10 bg-slate-300 dark:bg-slate-500">
        { recentPosts && recentPosts.length > 0 && (
            <div className=''>
                <div className='mb-3'>
                <h2 className='text-2xl font-semibold text-slate-600 dark:text-slate-100'>Recent Posts:</h2>
                    <Link className='text-sm text-white bg-[#42c8b7] py-1 px-2 rounded-lg hover:bg-slate-100 hover:text-[#42c8b7] mt-2' to={'/search?sort=createdAt&order=asc'}>Show more</Link>
                </div>
                <div className='flex flex-wrap gap-4'>
                {recentPosts.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                ))}
                </div>
            </div>    
        ) }
    </div>
  )
}
