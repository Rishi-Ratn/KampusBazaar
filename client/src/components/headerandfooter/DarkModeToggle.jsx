import { useState, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export default function DarkModeToggle(){
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    useEffect(()=>{
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    },[isDarkMode]);


    return (
        <button onClick={()=>setIsDarkMode(!isDarkMode)} className="hidden md:inline cursor-pointer bg-[#42c8b7] rounded-full px-3 py-3 text-white uppercase hover:scale-105">
                {isDarkMode ? <MdLightMode/> : <MdDarkMode/>}
        </button>
    )
};