import {useState} from 'react'

interface IMessage {
    message:string
}

const Message = ({message}:IMessage) => {
  return(
    <>
        <div className='flex justify-end'>
            <div className='flex m-3 bg-slate-400 rounded-3xl max-w-lg p-2 '>
                <p className='pr-2'>{message}</p>
            </div>
        </div>
    </>
  )
}

export default Message;