import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]); 
  const [showMore, setShowMore] = useState(false);
  const [ sideBarData, setSideBarData ] = useState({
    searchTerm: '',
    location: 'Any',
    priceType: 'any',
    sort: 'created_at',
    order: 'desc',
    condition: 'All',
    category: 'All',
  });

  console.log(sideBarData);

  useEffect(()=>{
    // first get the information from the url
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const locationFromUrl = urlParams.get('location');
    const priceTypeFromUrl = urlParams.get('priceType');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    const conditionFromUrl = urlParams.get('condition');
    const categoryFromUrl = urlParams.get('category');

    if( searchTermFromUrl || locationFromUrl || priceTypeFromUrl || sortFromUrl || orderFromUrl || conditionFromUrl || categoryFromUrl ){
        setSideBarData({
            searchTerm: searchTermFromUrl || '',
            location: locationFromUrl || 'Any',
            priceType: priceTypeFromUrl || 'any',
            sort: sortFromUrl || 'created_at',
            order: orderFromUrl || 'desc',
            condition: conditionFromUrl || 'All',
            category: categoryFromUrl || 'All',
        });
    }

    // Based on the information we have we want to fetch the data from the database and display it

    const fecthListings = async () => {
        setLoading(true);
        setShowMore(false);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if(data.length > 8){
            setShowMore(true);
        }else{
            setShowMore(false);
        }
        setListings(data);
        setLoading(false);
    }

    fecthListings();

  },[location.search]);     // if there is change in location.search -> change the sidebardata

  const handleChange = (e) => {
    if(e.target.id === 'Any' || e.target.id === 'insideIITK' || e.target.id === 'outsideIITK') {
        setSideBarData({...sideBarData, location: e.target.id });
    }

    if(e.target.id === 'any' || e.target.id === 'fixed' || e.target.id === 'negotiable'){
        setSideBarData({...sideBarData, priceType: e.target.id });
    }

    if(e.target.id === 'searchTerm'){
        setSideBarData({...sideBarData, searchTerm: e.target.value});
    }

    if(e.target.id === 'sort_order' ){
        const sort = e.target.value.split('_')[0] || 'created_at';
        const order = e.target.value.split('_')[1] || 'desc';

        setSideBarData({...sideBarData, sort, order });
    }

    if(e.target.id === 'condition' ){
        setSideBarData({...sideBarData, condition: e.target.value});
    }

    if(e.target.id === 'category' ){
        setSideBarData({...sideBarData, category: e.target.value});
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // when we click anything in form we want to keep it in search url of browser, so get the information of url first
    const urlParams = new URLSearchParams();         // later we add the useEffect anytime url change build the sidebardata with that url
    urlParams.set('searchTerm', sideBarData.searchTerm);
    urlParams.set('location', sideBarData.location);
    urlParams.set('priceType', sideBarData.priceType);
    urlParams.set('sort', sideBarData.sort);
    urlParams.set('order', sideBarData.order);
    urlParams.set('condition', sideBarData.condition);
    urlParams.set('category', sideBarData.category);
    
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    // now onchanging formdata, it's getting reflected to url, but when we are changing url it's not reflecting to formdata, therefore useEffect
  }

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if(data.length < 9){
        setShowMore(false);
    }
    setListings([...listings,...data]);
  }




  return (
    <main className='flex flex-col items-center px-3 bg-white dark:bg-slate-800 pb-10'>
        <>

          <div className="flex w-full flex-col md:flex-row py-3 gap-y-5 md:gap-x-7 rounded-lg mt-3">

            <div className="w-full md:w-1/3 p-5 bg-slate-200 rounded-xl text-center">

                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <div className="flex items-center gap-2 ">
                        <label className="whitespace-nowrap font-semibold">Search Term:</label>
                        <input value={sideBarData.searchTerm} onChange={handleChange} type="text" id="searchTerm" placeholder="Search..." className="border rounded-lg p-3 w-full" />
                    </div>

                    <div className="flex gap-2">
                        <label className="font-semibold">Location:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="Any" className="w-5" onChange={handleChange} checked={sideBarData.location === 'Any'}/>
                            <span>Any</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="insideIITK" className="w-5" onChange={handleChange} checked={sideBarData.location === 'insideIITK'}/>
                            <span>Inside IITK</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="outsideIITK" className="w-5" onChange={handleChange} checked={sideBarData.location === 'outsideIITK'}/>
                            <span>Outside IITK</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <label className="font-semibold">Price:</label>
                        <div className="flex gap-2">
                            <input type="checkbox" id="any" className="w-5" onChange={handleChange} checked={sideBarData.priceType === 'any'}/>
                            <span>Any</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="fixed" className="w-5" onChange={handleChange} checked={sideBarData.priceType === 'fixed'}/>
                            <span>Fixed</span>
                        </div>
                        <div className="flex gap-2">
                            <input type="checkbox" id="negotiable" className="w-5" onChange={handleChange} checked={sideBarData.priceType === 'negotiable'}/>
                            <span>Negotiable</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Category:</label>
                        <select onChange={handleChange} defaultValue={"All"} value={sideBarData.category} id="category" className="border rounded-lg p-2">
                            <option value="All" >All</option>
                            <option value="Bicycle" >Bicycle</option>
                            <option value="Cooler" >Cooler</option>
                            <option value="Mobile" >Mobile</option>
                            <option value="Laptop" >Laptop</option>
                            <option value="Books" >Books</option>
                            <option value="Ticket" >Ticket</option>
                            <option value="Study Materials" >Study Materials</option>
                            <option value="Electronic Items" >Electronic Items</option>
                            <option value="Lab Equipments" >Lab Equipments</option>
                            <option value="Calculator" >Calculator</option>
                            <option value="Mattress" >Mattress</option>
                            <option value="Room Decor" >Room Decor</option>
                            <option value="Others" >Others</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Condition:</label>
                        <select onChange={handleChange} defaultValue={"All"} value={sideBarData.condition} id="condition" className="border rounded-lg p-2">
                            <option value="All" >All</option>
                            <option value="Brand New" >Brand New</option>
                            <option value="Almost Like New">Almost Like New</option>
                            <option value="Gently Used" >Gently Used</option>
                            <option value="Heavily Used" >Heavily Used</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>
                        <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className="border rounded-lg p-2">
                            <option value='price_desc' >Price high to low</option>
                            <option value="price_asc" >Price low to high</option>
                            <option value="createdAt_desc" >Latest</option>
                            <option value="createdAt_asc" >Oldest</option>
                        </select>
                    </div>

                    <button className="bg-[#42c8b7] text-white p-3 font-semibold rounded-lg uppercase hover:opacity-90">Search</button>

                </form>

            </div>

            <div className="w-full md:w-2/3 bg-slate-200 rounded-xl overflow-y-auto h-[550px] ">
                <h2 className="text-xl bg-[#42c8b7] text-center p-2 text-white mt-5  rounded-xl w-1/2">Search Results</h2>
                <div className="p-7 flex flex-wrap gap-4">
                    {!loading && listings.length === 0 && (
                        <p className="text-xl text-slate-700">No Listing found!</p>
                    )}
                    {loading && (
                        <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
                    )}
                    {
                        !loading && listings && listings.map((listing)=>(
                            <ListingItem key={listing._id} listing={listing} />
                        ))
                    }

                    {showMore && (
                        <button onClick={onShowMoreClick} className="text-sm bg-[#42c8b7] text-white px-3 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300">
                            Show More
                        </button>
                    )}
                </div>

            </div>

          </div>

        </>
    </main>
  )
}
