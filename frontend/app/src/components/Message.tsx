import {useState} from 'react'

interface IMessage {
    message:string
}

const Message = ({message}:IMessage) => {
  return(
    <>
        <div className='flex justify-end'>
            <div className='flex m-5 bg-white shadow-xl rounded-3xl max-w-lg p-4 '>
                <p className='pr-2'>{message}</p>
            </div>
        </div>
    </>
  )
}

export default Message;