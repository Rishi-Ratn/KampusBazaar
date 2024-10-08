import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLandlord();
    }, [listing.userRef])       // if listing.userRef changes, useEffect runs, (it will run one time when component is called)

    return (
        <>
        {landlord && (
            <div className="flex flex-col gap-2">
                <p>Contact <span className="font-semibold">{landlord.username}</span>{' '}for{' '}<span className="font-semibold">{listing.title.toLowerCase()}</span> </p>
                <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder="Enter your message here..." className="w-full border p-3 rounded-lg -mt-1 " ></textarea>
                <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.title} listed on KampusBazaar site&body=${message}`} className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95" >
                    Send Message
                </Link>
            </div>
        )}
        </>
    );
}
