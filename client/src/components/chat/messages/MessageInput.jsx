import { BsSend } from "react-icons/bs";

const MessageInput = () => {
	return (
		<form className='px-4 my-3'>
			<div className='relative w-full flex flex-row'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 pr-10 bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
				/>
                <button 
                    type="submit" 
                    className="absolute right-1 top-1/2 p-2 rounded-full transform -translate-y-1/2 text-white hover:scale-125">
                    <BsSend />
                </button>
			</div>
		</form>
	);
};

export default MessageInput;

