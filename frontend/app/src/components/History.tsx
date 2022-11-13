import {useState, useEffect} from 'react'
import Message from './Message';

interface IData{
    id:number
    jwt:string
    toggle:()=>void
}

const History = ({id,jwt,toggle}:IData) => {

    const [messages,setMessages] = useState<Array<any>>([])

    useEffect(()=>{console.log(messages);
    },[messages])

    useEffect(()=>{
        const showHitory = async() => {
            await fetch('https://hack.invest-open.ru/chat/history?dialogId='+id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ jwt
                  },
                method:'GET',
            })
            .then(res=>res.text())
            .then(res=>JSON.parse(res).messages)
            .then(res=>setMessages(res)
            )
        }
        showHitory()
    },[])


 
  return(
        
    <div className='bg-slate-100 absolute items-center justify-center flex-col top-0 bottom-0 left-0 right-0 z-10 rounded-xl overflow-y-auto'>
        {
            messages && messages.map(mas => {
                return <Message message={mas.text}></Message>
            })
        }
        <p className='text-center m-5'><button className='bg-sky-400 w-1/2 p-1 m-1 rounded-3xl text-white' onClick={()=>{toggle()}}>Cancel</button></p>
    </div>
  )
}

export default History;