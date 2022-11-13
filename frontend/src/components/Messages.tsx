import {useState} from 'react'
import Message from './Message';

interface IData{
    messages:string[]
}

const Messages = ({messages}:IData) => {

  return(
    <>
        {
            messages.length>0 && messages.map(mas => {
                    return <Message message={mas}></Message>
                })
        }
    </>
  )
}

export default Messages;