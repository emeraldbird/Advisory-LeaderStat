import {useState, useEffect} from 'react'
import Message from './Message';

interface IData{
    jwt:string
    toggle:()=>void
}

const UserData = ({jwt,toggle}:IData) => {

    const [data,setData] = useState<any>({})

    useEffect(()=>{console.log(data)
    },[data])

    useEffect(()=>{
        const showHitory = async() => {
            await fetch('https://hack.invest-open.ru/user/info', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ jwt
                  },
                method:'GET',
            })
            .then(res=>res.text())
            .then(res=>setData(JSON.parse(res)))
            
        }
        showHitory()
    },[])

    const sendData = async() => {
        await fetch('https://hack.invest-open.ru/user/info', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ jwt
                  },
                method:'POST',
                body:JSON.stringify({
                        avatar: data.avatar,
                        surname: data.surname,
                        name: data.name,
                        middleName: data.middleName
                    })
                
            })
    }

 
  return(
    <div className=' absolute items-center justify-center flex top-0 bottom-0 left-0 right-0 z-10 rounded-xl'>
        <div className='h-auto w-96 bg-white rounded-xl justify-between items-center '>
                <div className='m-5'>
                    <p className='m-3'>Icon:</p>
                    <input type='text' className='w-full p-2 inline-block border-gray-900 bg-transparent border placeholder-stone-900 rounded-xl focus:outline-none'
                    value={data.avatar} onChange={(text)=>{setData({...data,avatar:text.target.value})}}></input>
                    <p className='m-3'>Name:</p>
                    <input type='text' className='w-full p-2 border-gray-900 bg-transparent border placeholder-stone-900 rounded-xl focus:outline-none'
                    value={data.name} onChange={(text)=>{setData({...data,name:text.target.value})}}></input>
                    <p className='m-3'>Surname:</p>
                    <input type='text' className='w-full p-2 border-gray-900 bg-transparent border placeholder-stone-900 rounded-xl focus:outline-none'
                    value={data.surname} onChange={(text)=>{setData({...data,surname:text.target.value})}}></input>
                    <p className='m-3'>Middlename:</p>
                    <input type='text' className='w-full p-2 border-gray-900 bg-transparent border placeholder-stone-900 rounded-xl focus:outline-none'
                    value={data.middleName} onChange={(text)=>{setData({...data,middleName:text.target.value})}}></input>
                    <div className='w-fill h-16 flex justify-center'>
                        <button className='bg-slate-400 m-3 w-28 rounded-xl' onClick={()=>{sendData()}}>Confirm</button>
                        <button className='bg-slate-400 m-3 w-28 rounded-xl' onClick={()=>{toggle()}}>Cancel</button>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default UserData;