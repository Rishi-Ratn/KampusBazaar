import React from 'react'
import SideBar from '../components/chat/sidebar/SideBar'
import MessageContainer from '../components/chat/messages/MessageContainer'

export default function Chat() {
  return (
    <div className='flex justify-center items-center mt-20 md:mt-0 sm:h-[450px] md:h-[550px] overflow-hidden gap-1'>
    <SideBar />
    <MessageContainer />
  </div>
  )
}

