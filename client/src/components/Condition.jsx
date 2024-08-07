import { useState } from "react";

export default function Condition() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className='relative cursor-pointer'> 
        <div className="relative">
          <input value={selectedItem ? selectedItem : ""} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} type="text" placeholder="Select Condition" className="placeholder-slate-900 placeholder-opacity-100 cursor-pointer hover:placeholder-opacity-70 hover:bg-[#42c8b7] bg-slate-300 text-center px-2 py-3 rounded-lg w-full ${obj} outline-none" readOnly id="condition" />
          { selectedItem && 
            <label className="absolute left-3 top-1 text-slate-700 bg-[#42c8b7] rounded-lg text-sm px-2 ">Condition</label>
          }
        </div>
        { isOpen && 
           <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)} className="right-[0px] md:left-[0px] absolute top-[53px] bg-gray-100 flex flex-col rounded-xl w-full  ">
              <div className="">
                <div onClick={()=>{setSelectedItem("Brand New"); setIsOpen(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Brand New</div>
                <div onClick={()=>{setSelectedItem("Almost Like New"); setIsOpen(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Almost Like New</div>
                <div onClick={()=>{setSelectedItem("Gently Used"); setIsOpen(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Gently Used</div>
                <div onClick={()=>{setSelectedItem("Heavily Used"); setIsOpen(false)}} className="p-2 border-s-black hover:bg-[#42c8b7] rounded-lg text-base">Heavily Used</div>
              </div>
           </div>
        }
      </div>
    </>
  )
}




