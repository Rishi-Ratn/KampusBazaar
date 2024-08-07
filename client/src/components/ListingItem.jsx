import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[290px]'>
      <Link to={`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt='listing cover' className='h-[320px] sm:h-[250px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.title}
          </p>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-gray-600 truncate w-full'>
              {listing.location}
            </p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            Rs {listing.price.toLocaleString('en-US')}
          </p>
          <div className='text-slate-700 flex gap-4'>
            <div className='font-bold text-xs'>
              {listing.category}
            </div>
            <div className='font-bold text-xs'>
              {listing.condition}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
