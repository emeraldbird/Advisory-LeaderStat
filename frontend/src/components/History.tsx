import {useState, useEffect} from 'react'
import Message from './Message';

interface IData{
    id:number
    jwt:string
}

const History = ({id,jwt}:IData) => {

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
            .then(res=>res)
        }
        showHitory()
    },[])


 
  return(
        
    <div className='bg-slate-600 absolute items-center justify-center flex opacity-70 top-0 bottom-0 left-0 right-0 z-10 rounded-xl'>
        {
            messages && messages.map(mas => {
                return <Message message={mas}></Message>
            })
        }
    </div>
  )
}

export default History;