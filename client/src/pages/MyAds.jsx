import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MyAds() {
  const [showListingError, setShowListingError] = useState(false);
  const {currentUser} = useSelector((state) => state.user);
  const [userListings, setUserListings] = useState([]);

  useEffect(()=>{
    const handleShowMyAds = async () => {
      try {
          setShowListingError(false);
          const res = await fetch(`/api/user/listings/${currentUser._id}`);
          const data = await res.json();
          if(data.success === false){
              setShowListingError(true);
              return;
          }
          setUserListings(data);
          console.log(data);
          console.log(userListings.length);
      } catch (error) {
          setShowListingError(true);
      }
    }
    // Fetch user's posted ads when the component mounts
    handleShowMyAds();
  },[]);

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings( (prev) => prev.filter((listing) => listing._id!== listingId));
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <section className='dark:bg-gray-200 min-h-fit flex items-center justify-center'>

      <div className='bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-3xl mt-3 px-2 py-3 items-center'>
          <div className="px-8 flex flex-col">
            <div className="text-center">
              <h2 className='font-bold text-2xl text-[#42c8b7] uppercase '>My Posted Ads</h2>
              <p className='text-sm mt-2 mb-6 text-[#42c8b7]'>You can Edit and Delete your posted Ads from here</p>
            </div>

            { userListings && userListings.length > 0 &&
                userListings.map((listing) => (
                  <div key={listing._id} className='border-b border-gray-400 rounded-lg p-3 flex justify-between items-center gap-y-4 gap-x-10 '>
                    <Link to={`/listing/${listing._id}`}>
                        <img src={listing.imageUrls[0]} alt="cover" className="h-16 w-16 object-contain" />
                    </Link>
                    <Link className='flex-1' to={`/listing/${listing._id}`}>
                    <h3 className='font-bold truncate text-sm text-[#42c8b7]'>{listing.title}</h3>
                    </Link>
                    {/* <p className='text-sm text-[#42c8b7]'>{listing.category}</p> */}
                    <div className="flex flex-col items-center font-semibold font">
                        <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase hover:opacity-65">Delete</button>
                        <Link to={`/update-ad/${listing._id}`}>
                        <button className="text-green-700 uppercase hover:opacity-65">Edit</button>
                        </Link>
                    </div>
                  </div>
                ))
            }

            <div className="text-xs flex justify-between items-center mt-1 ">
              {userListings.length > 0 ? <p className='text-[#42c8b7]' >Click on the title/image to view Ad</p> : <p className='text-red-700'>You have not posted any Ad yet!</p>}
            </div>

          </div>
      </div>
      
    </section>
  )
}

