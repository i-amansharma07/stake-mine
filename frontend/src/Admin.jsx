import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"

function Admin() {

    const [action, setAction] = useState(99);

    async function handleWinClick(){
        if(action == 1){
            alert("Already Applied force Win")
            return;
        }
        const req = await axios.get('http://192.168.1.10:3000/force_win')
        if(req.data.win){
            setAction(1);
        }


    }

    async function handleLooseClick(){
        if(action == -1){
            alert("Already Applied force Loose")
            return;
        }
        const req = await axios.get('http://192.168.1.10:3000/force_loose')
        if(!req.data.win){
            setAction(-1);
        }
    }

    async function handleNeutralClick(){
        if(action == 0){
            alert("Already Applied Neutral")
            return;
        }
        const req = await axios.get('http://192.168.1.10:3000/neutral')
     setAction(0)
    }



  return (
    <div className='flex flex-col justify-center gap-10 items-center h-screen w-screen'>
        {action !=99 && <div>{`You have applied Force`} <span className=' text-xl font-bold text-indigo-600'>{action == 1 ? "Win" : action == -1 ? "Loose" : "Neutral"}</span></div>}
        <div className='flex flex-col gap-8'>
        <button className={`border bg-green-500 p-2 rounded-md text-white`} onClick={handleWinClick}>{'Make User Win'}</button>
        <button className={`border bg-red-500 p-2 rounded-md text-white`} onClick={handleLooseClick}>{'Make User Loose'}</button>
        <button className={`border bg-yellow-500 p-2 rounded-md text-white`} onClick={handleNeutralClick}>{'Make Game Neutral'}</button>
        </div>
</div>
  )
}

export default Admin;
