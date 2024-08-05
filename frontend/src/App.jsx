import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"

function App() {

    const [isBetOn, setIsBetOn] = useState(false);
    const [betAmount, setBetAmount] = useState(0);

    function handleSubmit(e){
        e.preventDefault()

        const amount = e.target[0].value;
        if(isBetOn){
            alert("already inside a bet")
            return;
        }

        setIsBetOn(true)
        setBetAmount(amount);
    }

    function handleCashout(){
        setIsBetOn(false)
    }


  return (
    <div className='flex p-10 w-screen justify-center items-center gap-20'>
    <div className='form p-16 border border-black rounded-md'>
        <form className='flex flex-col  gap-4 ' onSubmit={handleSubmit}>
            {isBetOn && `Your bet amount is ${betAmount}`}
        <input placeholder="Enter" className='border p-2 rounded-md' type='number' min={0} required/>
        <button className={`border bg-blue-300 p-2 rounded-md text-white ${isBetOn ? 'hidden' : 'bg-blue-600'}`} type="submit">{ isBetOn ? 'on going bet....' : 'Start Bet'}</button>
        {isBetOn && <button className='bg-green-400 p-2 rounded-md' onClick={handleCashout} >Cash Out</button>}
        </form>
    </div>
    <div className='border border-black rounded-md h-[500px] w-[500px] grid grid-cols-4'>
    {Array(16).fill(0).map((item, idx) => <Block  key={idx} isBetOn={isBetOn} serial={idx} amount={betAmount} setIsBetOn={setIsBetOn}/>)}
</div>
</div>
  )
}

function Block({isBetOn, amount, setIsBetOn}){
    const [currentColor, setCurrentColor] = useState('')

    useEffect(() =>{
        setCurrentColor('bg-gray-300')
    },[isBetOn])

    async function handleClick() {
        if(!isBetOn){
            alert("Please Start the bet First")
            return;
        }
        let color;
       const req = await axios.post('http://192.168.1.10:3000/click', {amount});

        if(req.data.win){
            color = 'bg-green-300';
        }else{
            color = 'bg-red-300';
            setTimeout(() => {
                setIsBetOn(false);
            }, 1000);
        }


        setCurrentColor(color)
    }

    return (
        <div onClick={currentColor == "bg-green-300" ? null : handleClick} className={`w-[125px] h-[125px] border border-black ${currentColor}`}/>
    )
}

export default App
