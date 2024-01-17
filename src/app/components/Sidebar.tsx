"use client"

import { Timestamp, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { IoMdLogOut } from "react-icons/io";
import { db } from '../../../firebase';
import { where } from 'firebase/firestore/lite';

const Sidebar = () => {
    type Rooms = {
        id:string;
        createdAt:Timestamp;
        name:string;
        userId:string;
    }

    const [rooms,setRooms] = useState<Rooms[]>([]);

    useEffect(() => {
        const fetchRooms = async() => {
            const roomCollectionRef = collection(db,"rooms");
            const q = query(roomCollectionRef,where("userId", "==", "ioGQnFt9F0VxgEOYDxy2CwgJ6J53" ), orderBy("createdAt","desc"));
            onSnapshot(q,(snapshot) => {
                let newRooms:Rooms[] = [];
                snapshot.docs.forEach((doc) => {
                    newRooms.push({ 
                        createdAt:doc.data().createdAt,
                        name:doc.data().name,
                        userId:doc.data().userId,
                        id:doc.id})
                });
                setRooms(newRooms);
            })
        }
        fetchRooms();
    },[])
  return (
    <div className='h-full overflow-y-auto px-5 flex flex-col bg-custom-blue'>
        <div className='grow'>
            <div className='flex justify-evenly items-center border mt-2 rounded-md cursor-pointer hover:bg-blue-800 duration-150'>
                <span className='text-white p-4 text-2xl'>+</span>
                <h1 className='text-white text-xl font-semibold p-4'>New Chat</h1>
            </div>
            <div>
                <ul>
                    {rooms.map((room) => (
                    <li key={room.id} className='cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150'>{room.name}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className='text-lg flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:bg-slate-700 duration-150'>
            <IoMdLogOut />
            <span>ログアウト</span>
        </div>
    </div>
  )
}

export default Sidebar