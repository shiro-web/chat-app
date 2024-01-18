"use client";

import { Timestamp, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { IoMdLogOut } from "react-icons/io";
import { db } from '../../../firebase';
import { where } from 'firebase/firestore';
import { useAppContext } from '@/context/AppContext';

type Rooms = {
    id:string;
    createdAt:Timestamp;
    name:string;
    userId:string;
}

const Sidebar = () => {
    const {user,userId,setSelectedRoom} = useAppContext();
    const [rooms,setRooms] = useState<Rooms[]>([]);


    useEffect(() => {
        const fetchRooms = async() => {
            const roomCollectionRef = collection(db,"rooms");
            const q = query(roomCollectionRef,where("userId", "==", userId ), orderBy("createdAt","desc"));
            const unsubscribe = onSnapshot(q,(snapshot) => {
                let newRooms:Rooms[] = [];
                snapshot.docs.forEach((doc) => {
                    newRooms.push({ 
                        createdAt:doc.data().createdAt,
                        name:doc.data().name,
                        userId:doc.data().userId,
                        id:doc.id})
                });
                setRooms(newRooms);
                return () => {
                    unsubscribe();
                };
            })
        }
        fetchRooms();

    },[]);

    const selectRoom = (roomId:string) => {
        setSelectedRoom(roomId);
        console.log(roomId)
    }
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
                    <li 
                    key={room.id} 
                    className='cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150'
                    onClick ={() => selectRoom(room.id)}>
                        {room.name}
                    </li>
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