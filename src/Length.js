import React from "react";

export default function Length({ title, changeTime, type, time, formateTime }) {
  return (
    <div className="length-control">
      <h3 className="title-length">{title}</h3>
      <div className="time-set">
        <button
          id="break-decrement"
          onClick={() => {
            changeTime(-60, type);
          }}
        >
          <i></i>-
        </button>
        <h3 id="break-length">{formateTime(time)}</h3>
        <button
          id="break-increment"
          onClick={() => {
            changeTime(60, type);
          }}
        >
          <i></i>+
        </button>
      </div>
    </div>
  );
}
