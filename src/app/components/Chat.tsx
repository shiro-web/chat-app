import React from 'react';
import { FaPaperPlane } from "react-icons/fa6";

const Chat = () => {
  return (
    <div className='bg-gray-500 h-full p-4 flex flex-col'>
        <h1 className='text-2xl text-white font-semibold mb-4'>Room1</h1>
        <div className='flex-grow over-flow-y-auto mb-4'>
            <div className='text-right'>
                <div className='bg-blue-500 inline-block p-2'>
                   <p className='text-white font-medium'>Hello</p>
                </div>
            </div>
            <div className='text-left'>
                <div className='bg-green-500 inline-block p-2'>
                   <p className='text-white font-medium'>How are you?</p>
                </div>
            </div>

        </div>
        <div className='flex-shrink-0 relative'>
            <input type="text" placeholder='メッセージを送ってください' className='border-2 rounded w-full pr-10 focus:outlinie-none p-2'/>
            <button className='absolute right-5 flex items-center inset-y-0'><FaPaperPlane /></button>
        </div>
    </div>
  )
}

export default Chat