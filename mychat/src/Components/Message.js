import React, { useState } from 'react';
import './message.css';
import Timestamp from './Timestamp';

const Message = ({ user, message, classs }) => {
  const [time, setTime] = useState(<Timestamp/>)
     
  return (
    <div className={`${classs} msgbox`}>
      {user && (
        <>
          ~~ <b>{`${user}`}</b> <br></br>
        </>
      )}
      {`${message}`}
      <div className='timestamp'>   <br></br>{ time}</div>
    </div>
  );
};

export default Message;
