import React, { useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import trafficLightMachine from './signal-app';

function TrafficLight() {
  const [state, send, TIMER] = useMachine(trafficLightMachine);

  const timerRef = useRef<NodeJS.Timeout | null>(null);



  const handleSubtractTime = () => send('SUBTRACT_TIME');

  return (
    <div>
      <div>
        <h2>Timer: {state.context.timer}</h2>
      </div>
      <div>
        <button onClick={handleSubtractTime}>Subtract 10s</button>
      </div>
      <div id="traffic-light">
        <button
          id="top"
          style={{
            backgroundColor: state.matches('red') ? 'red' : 'black',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
        />
        <button
          id="middle"
          style={{
            backgroundColor: state.matches('yellow') ? 'yellow' : 'black',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
        />
        <button
          id="bottom"
          style={{
            backgroundColor: state.matches('green') ? 'green' : 'black',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
}

export default TrafficLight;
