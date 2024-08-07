import { useEffect, useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';


export default function CreateListing() {
  const {currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();  
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [selectedItemCategory, setSelectedItemCategory] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: '',
    description: '',
    category: '',
    condition: '',
    price: 100,
    priceType: 'fixed',
    location: 'insideIITK',
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  

  useEffect(()=>{
    const fetchlisting = async () => {
        const listingId = params.listingId;
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if(data.success === false){
            console.log(data.message);
            return;
        }
        setFormData(data);
    }
    fetchlisting();
  },[]);


  const handleImageSubmit = (e) => {
    if(files.length > 0 && files.length + formData.imageUrls.length < 7){
        setUploading(true);
        setImageUploadError(false);
        const promises = [];
        for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
        }
        // after pushing everything in promise, i.e performing storeImage function the following executes:
        Promise.all(promises).then((urls) => {
            setFormData({...formData, imageUrls: formData.imageUrls.concat(urls), });
            setImageUploadError(false);
            setUploading(false);
        }).catch((error) => {
            setImageUploadError('Image upload failed ( 2MB max per image )');
            setUploading(false);
        });
    }else{
        setImageUploadError('You can only upload 6 images!');
        setUploading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
        },
        (error) => {
            reject(error);
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
            });
        }
    );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
        ...formData, 
        imageUrls: formData.imageUrls.filter((_,i) => i !== index),   //filter method gives us the urls but we wanna keep urls that does not match this index
    });
  }

  const handleChange = (e) => {
    if(e.target.id === 'fixed' || e.target.id === 'negotiable'){
        setFormData({...formData, priceType: e.target.id });
    }
    if(e.target.id === 'insideIITK' || e.target.id === 'outsideIITK'){
        setFormData({...formData, location: e.target.id });
    }
    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
        setFormData({...formData, [e.target.id] : e.target.value});
    }
    if(e.target.id === 'condition' ){
        setFormData({...formData, [e.target.id] : e.target.value});
    }
  }

    const handleDropdownChange = (item) => {
    setSelectedItem(item);
    setFormData((prevFormData) => ({
      ...prevFormData,
      condition: item,
    }));
  };

  const handleDropdownChangeCategory = (item) => {
    setSelectedItemCategory(item);
    setFormData((prevFormData) => ({
     ...prevFormData,
      category: item,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(formData.imageUrls.length < 1) return setError('You must upload at least one image');
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/update/${params.listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                userRef: currentUser._id,
            }),
        });
        const data = await res.json();
        setLoading(false);
        if(data.success === false){
            setError(data.message);
        }
        navigate(`/listing/${data._id}`);  
    } catch (error) {
        setError(data.message);
        setLoading(false);
    }
  };

  return (

    <main className="bg-white dark:bg-slate-800 p-4">
    <div className='px-7 mt-7 pt-2 pb-6 py-5 max-w-4xl mx-auto rounded-xl bg-slate-200'>
        <h1 className='text-3xl font-semibold text-center mb-7'>EDIT YOUR AD</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-6 flex-1'>

                {/* Dropdown container */}
                <div className='flex flex-row text-lg gap-x-3'>
                    <div className='relative cursor-pointer'> 
                        <div className="relative">
                        <input value={selectedItem || ""} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} type="text" placeholder="Select Condition" className="placeholder-slate-900 placeholder-opacity-100 cursor-pointer hover:placeholder-opacity-70 hover:bg-[#42c8b7] bg-slate-300 text-center px-2 py-3 rounded-lg w-full ${obj} outline-none" readOnly id="condition" />
                        { selectedItem && 
                            <label className="absolute left-3 -top-2 text-slate-700 bg-[#42c8b7] rounded-lg text-sm px-2 ">Condition</label>
                        }
                        </div>
                        { isOpen && 
                        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="right-[0px] md:left-[0px] absolute top-[53px] bg-gray-100 flex flex-col rounded-xl w-full  ">
                            <div className="">
                                <div onClick={()=>{handleDropdownChange("Brand New"); setIsOpen(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Brand New</div>
                                <div onClick={()=>{handleDropdownChange("Almost Like New"); setIsOpen(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Almost Like New</div>
                                <div onClick={()=>{handleDropdownChange("Gently Used"); setIsOpen(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Gently Used</div>
                                <div onClick={()=>{handleDropdownChange("Heavily Used"); setIsOpen(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Heavily Used</div>
                            </div>
                        </div>
                        }
                    </div>

                    {/* <Category/> */}

                    <div className='relative cursor-pointer '> 
                        <div className="relative">
                        <input value={selectedItemCategory || ""}  onMouseEnter={() => setIsOpenCategory(true)} onMouseLeave={() => setIsOpenCategory(false)} type="text" placeholder="Select Category" className=" placeholder-slate-900 cursor-pointer placeholder-opacity-100 hover:placeholder-opacity-70 hover:bg-[#42c8b7] text-center px-2 py-3 rounded-lg w-full bg-slate-300 outline-none" readOnly id="category" />
                        { selectedItemCategory && 
                            <label className="absolute left-3 -top-2 text-slate-700 bg-[#42c8b7] rounded-lg text-sm px-2 ">Category</label>
                        }
                        </div>
                        { isOpenCategory && 
                        <div value={selectedItemCategory || ""} onMouseEnter={() => setIsOpenCategory(true)} onMouseLeave={() => setIsOpenCategory(false)} className="right-[0px] md:left-[0px] absolute top-[53px] bg-gray-100 flex flex-col rounded-xl w-full  ">
                            <div className="">
                                <div onClick={()=>{handleDropdownChangeCategory("Bicyle"); setIsOpenCategory(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Bicycle</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Cooler"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Cooler</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Mobile"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Mobile</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Laptop"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Laptop</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Books"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Books</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Events Ticket"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Events Ticket</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Study Materials"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Study Materials</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Electronic Appliances"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Electronic Appliances</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Lab Equipments"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Lab Equipments</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Calculator"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Calculator</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Mattress"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Mattress</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Room Decor"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Room Decor</div>
                                <div onClick={()=>{handleDropdownChangeCategory("Others"); setIsOpenCategory(false)}} className="p-1 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Others</div>
                            </div>
                        </div>
                        }
                    </div>

                </div>


                {/* Product detail */}
                <input onChange={handleChange} value={formData.title} type="text" placeholder='Ad Title' className=' text-slate-800 border p-3 rounded-lg' id='title' maxLength='62' minLength='8' required/>
                <textarea onChange={handleChange} value={formData.description} type="text" placeholder='Product Description' className=' text-slate-800 border p-3 rounded-lg' id='description' required/>


                {/* Price */}
                <div className='gap-y-0'>
                    <div className='flex items-center flex-wrap gap-0 '>
                        <p className='font-bold text-slate-700 uppercase'>Set a Price</p>
                        <input onChange={handleChange} value={formData.price} type="number" id='price' min='0' max='10000000' placeholder='In Rupees' required className='p-3 border border-gray-300 rounded-lg w-full' />
                    </div>
                    <div className='flex gap-6 flex-wrap text-base '>
                        <div className='flex-1 gap-2'>
                            <input type="checkbox" id='fixed' className='cursor-pointer w-5' onChange={handleChange} checked={formData.priceType === 'fixed'} />
                            <span>Fixed Price</span>
                        </div>
                        <div className='flex-1 gap-2'>
                            <input type="checkbox" id='negotiable' className='cursor-pointer w-5' onChange={handleChange} checked={formData.priceType === 'negotiable'} />
                            <span>Negotiable</span>
                        </div>
                    </div>
                </div>

                
                {/* Location */}
                <div className='gap-y-0'>
                    <p className='font-bold text-slate-700 uppercase'>Location</p>
                    <div className='flex gap-x-6 flex-wrap bg-slate-300 p-1 text-lg items-center rounded-lg '>
                        <div className='flex-1'>
                            <input type="checkbox" id='insideIITK' className='cursor-pointer w-5' onChange={handleChange} checked={formData.location === 'insideIITK'}/>
                            <span>Inside IITK</span>
                        </div>
                        <div className='flex-1'>
                            <input type="checkbox" id='outsideIITK' className='cursor-pointer w-5' onChange={handleChange} checked={formData.location === 'outsideIITK'}/>
                            <span>Outside IITK</span>
                        </div>
                    </div>
                </div>

            </div>


            {/* IMAGE CONTAINER */}

            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>
                    IMAGES:
                    <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full ' type="file" id="images" accept='image/*' multiple />
                    <button type="button" onClick={handleImageSubmit} disabled={uploading} className='p-3 text-[#42c8b7] border border-[#42c8b7] rounded uppercase hover:shadow-lg disabled:opacity-80 font-semibold'> {uploading ? 'Uploading...' :'Upload' } </button>
                </div>
                <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
                        <div key={url} className="flex justify-between p-3 border items-center">
                            <img src={url} alt="image" className="w-20 h-20 object-contain rounded-lg"/>
                            <button onClick={()=>handleRemoveImage(index)} type="button" className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75" >Delete</button>
                        </div>
                    ))
                }
                <button disabled={loading || uploading } className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> {loading ? 'Updating...' : 'Update Ad'} </button>
            </div>

        </form>
    </div>
    </main>
  )
}
