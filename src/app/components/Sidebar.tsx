"use client";

kannimport { Timestamp, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { IoMdLogOut } from "react-icons/io";
import { auth, db } from '../../../firebase';
import { where } from 'firebase/firestore';
import { useAppContext } from '@/context/AppContext';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

type Rooms = {
    id:string;
    createdAt:Timestamp;
    name:string;
    userId:string;
}

const Sidebar = () => {
    const {user,userId,setSelectedRoom,setSelectRoomName} = useAppContext();
    const [rooms,setRooms] = useState<Rooms[]>([]);

    useEffect(() => {
        if(user) {
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
                    console.log(newRooms)
                    setRooms(newRooms);
                    return () => {
                        unsubscribe();
                    };
                })
            }
            fetchRooms();
        }
console.log(user)
    },[userId]);

    const selectRoom = (roomId:string,roomName:string) => {
        setSelectedRoom(roomId);
        setSelectRoomName(roomName);
    }

    const addNewRoom = async () => {
       const roomName =  prompt("ルーム名を入力してください");
       if(roomName) {
        const newRoomRef = collection(db,"rooms");
        await addDoc(newRoomRef,{
            name:roomName,
            userId:userId,createdAt:serverTimestamp(),
        })
       }
    }

    const handleLogout = () => {
        auth.signOut()
    }
  return (
    <div className='h-full overflow-y-auto px-5 flex flex-col bg-custom-blue'>
        <div className='flex-grow'>
            <div onClick={addNewRoom} className='flex justify-evenly items-center border mt-2 rounded-md cursor-pointer hover:bg-blue-800 duration-150'>
                <span className='text-white p-4 text-2xl'>+</span>
                <h1 className='text-white text-xl font-semibold p-4'>New Chat</h1>
            </div>
            <div>
                <ul>
                    {rooms.map((room) => (
                    <li 
                    key={room.id} 
                    className='cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150'
                    onClick ={() => selectRoom(room.id,room.name)}>
                        {room.name}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
        {user && (
            <div className='mb-2 p-4 text-slate-100 text-lg font-medium'>{user.email}</div>
        )}
        <div onClick={() => handleLogout()} className='text-lg flex items-center justify-evenly mb-2 cursor-pointer p-4 text-slate-100 hover:bg-slate-700 duration-150'>
            <IoMdLogOut />
            <span>ログアウト</span>
        </div>
    </div>
  )
}

export default Sidebar