import { useMachine } from "@xstate/react";
import React, { useEffect, useState } from "react";
import trafficLightMachine from "./signalXstate";
import "./App.css";

const App = () => {
  const [current, send] = useMachine(trafficLightMachine);

  let counter = current.matches("red")
    ? current.context.redTimer
    : current.matches("green")
    ? current.context.greenTimer
    : current.matches("yellow")
    ? current.context.yellowTimer
    : "00";

    useEffect(()=>{
      send("START_TIMER");
      
    },[])
  const pedestrianTimeSubtract = () => {
    send('SUBTRACT_TIME')
  };
  return (
    <div className="traffic-wrapper" >
      <div className="traffic-light-pole">
    <div id="traffic-light">
        <button
          id="top"
          className={`light red ${current.matches("red") ? "active" : ""}`}
        />
        <button
          id="middle"
          className={`light yellow ${
            current.matches("yellow") ? "active" : ""
          }`}
        />
        <button
          id="bottom"
          className={`light green ${current.matches("green") ? "active" : ""}`}
        />
      </div>
      <div className="traffic-pole"></div>
      </div>
<div className="traffic-timer">
      <div className="time"> {counter}s</div>
      <button className="pedestrian-btn" onClick={pedestrianTimeSubtract}>Pedestrian Walking</button>
     
      </div>
    </div>
  );
};

export default App;
