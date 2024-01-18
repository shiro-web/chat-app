"use client";

import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FaPaperPlane } from "react-icons/fa6";
import { db } from '../../../firebase';
import { useAppContext } from '@/context/AppContext';

type Message = {
    text:string;
    sender:string;
    createdAt:Timestamp;
}

const Chat = () => {
    const [inputMessage,setInputMessage] = useState<string>("");
    const [messages,setMessages] = useState<Message[]>([]);
    const {selectedRoom} = useAppContext();
    const messageData = {
        text:inputMessage,
        sender:"user",
        createdAt:serverTimestamp(),
    }

    useEffect(() => {
        if(selectedRoom){
            const fetchMessages = async() => {
                const roomDocRef = doc(db,"rooms",selectedRoom);
                const messagesCollectionRef = collection(roomDocRef,"messages");

                const q = query(messagesCollectionRef,orderBy("createdAt"));

                const unsubscribe = onSnapshot(q,(snapshot) => {
                   const newMessages = snapshot.docs.map((doc) => doc.data() as Message);
                   setMessages(newMessages);
                });
                return() => {
                    unsubscribe();
                };
            };
            fetchMessages();
        }
    },[selectedRoom])

    const sendMessage = async() => {
        if(!inputMessage.trim()) return;

        const roomDocRef = doc(db,"rooms","hm82Jb9fXp524gGctL7M");
        const messageCollectionRef = collection(roomDocRef,"messages");

        await addDoc(messageCollectionRef,messageData)

    }

  return (
    <div className='bg-gray-500 h-full p-4 flex flex-col'>
        <h1 className='text-2xl text-white font-semibold mb-4'>Room1</h1>
        <div className='flex-grow over-flow-y-auto mb-4'>
            {messages.map((message) => (
                <>
                    <div className='text-right'>
                        <div className='bg-blue-500 inline-block p-2'>
                        <p className='text-white font-medium'>{message.text}</p>
                        </div>
                    </div>
                    <div className='text-left'>
                        <div className='bg-green-500 inline-block p-2'>
                        <p className='text-white font-medium'>{message.text}</p>
                        </div>
                    </div>
                </>
            ))}


        </div>
        <div className='flex-shrink-0 relative'>
            <input 
            type="text" 
            placeholder='メッセージを送ってください' 
            className='border-2 rounded w-full pr-10 focus:outlinie-none p-2'
            onChange={(e) => setInputMessage(e.target.value)}
            />
            <button className='absolute right-5 flex items-center inset-y-0' onClick={() => sendMessage()}>
                <FaPaperPlane />
            </button>
        </div>
    </div>
  )
}

export default Chat