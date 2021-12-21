import React from 'react'


export default function Length({title,changeTime,type,time,formateTime}) {
    return (
       <div>
           <h3 className='title-length'>{title}</h3>
           <div className='time-set'>
                <button
                onClick={()=>{changeTime(-60,type)}}
                >
                    <i></i>
                    down
                </button>
                <h3>{formateTime(time)}</h3>
                <button
                onClick={()=>{changeTime(60,type)}}

                >
                    <i></i>
                    up
                </button>
           </div>

       </div>
    )
}
