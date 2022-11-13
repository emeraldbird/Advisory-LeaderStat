import {useState} from 'react'
import { sha256 } from 'js-sha256';

interface IData{
    update:(i:string)=>void,
    updateId:(i:number)=>void,
    toggle:()=>void
    jwt:string
}


const Autentification = ({update,jwt,updateId,toggle}:IData) => {

    const [autorised,setAutorised] = useState(false)

    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    let token:string

    const autorise = async() => {
        await fetch('https://hack.invest-open.ru/auth', {
            headers: {
                'Content-Type': 'application/json'
              },
            method:'POST',
            body: JSON.stringify({
                "login": name, 
                "password": sha256(password) //"b5c1d80547506e4cccee483d180619711964323ce66b62e17a9567c0fdbb67d4"
            })
        })
        .then(res=>res.text())
        .then(res=>{
            update(JSON.parse(res).jwtToken)
            token = JSON.parse(res).jwtToken
        })
        /* .then(()=>{
            fetch('https://invest-hackathon.ru/api/check_token', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ token,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods':' GET, POST, PATCH, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers':' Origin, Content-Type, X-Auth-Token'
                  },
                method:'GET'
            })
        .then(res=>res.text())
        .then(res=> console.log('Otvet:'+ JSON.parse(res)))
        }) */
        .then(()=>{
            fetch('https://hack.invest-open.ru/chat/dialog', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
              },
            method:'GET'
        })
        .then(res=>res.text())
        .then(res=> updateId((JSON.parse(res)).dialogId))
        })
        setAutorised(!autorised)
        toggle()
    }

  return(<>
        {autorised
            ?
            <></>
            :
        <div className=' absolute items-center justify-center flex opacity-70 top-0 bottom-0 left-0 right-0 z-10 rounded-xl'>
            <div className='h-80 w-96 bg-slate-100 rounded-xl justify-between items-center'>
                <div className='m-5'>
                    <p className='m-3 mt-10 text-center'>Login:</p>
                    <input type='text' className='w-full p-2 inline-block shadow-xl bg-white placeholder-stone-900 rounded-3xl focus:outline-none'
                    value={name} onChange={(text)=>{setName(text.target.value)}}></input>
                    <p className='m-3 text-center'>Password:</p>
                    <input type='text' className='w-full p-2 placeholder-stone-900 bg-white shadow-xl rounded-3xl focus:outline-none'
                    value={password} onChange={(text)=>{setPassword(text.target.value)}}></input>
                    <div className='w-fill h-24 flex justify-center'>
                        <button className='bg-sky-400 m-3 mt-10 w-28 rounded-3xl' onClick={()=>{autorise()}}>Enter</button>
                    </div>
                </div>
            </div>
        </div>}
    </>
  )
}

export default Autentification;