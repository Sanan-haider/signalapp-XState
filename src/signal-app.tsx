import { createMachine, assign } from 'xstate';

const trafficLightMachine = createMachine(
  {
    id: 'trafficLight',
    initial: 'red',
    context: {
      timer: 20,
    },
    states: {
      red: {
        entry: 'resetTimer',
        on: {
          TIMER: { actions: 'decrementTimer' },
          CHANGE_SIGNAL: 'green',
        },
      },
      yellow: {
        entry: 'resetTimer',
        on: {
          TIMER: { actions: 'decrementTimer' },
          CHANGE_SIGNAL: 'red',
        },
      },
      green: {
        entry: 'resetTimer',
        on: {
          TIMER: { actions: 'decrementTimer' },
          CHANGE_SIGNAL: 'yellow',
          SUBTRACT_TIME: { actions: 'subtractTime' },
        },
      },
    },
  },
  {
    actions: {
      decrementTimer: assign({
        timer: (context, _) => Math.max(context.timer - 1, 0),
      }),
      resetTimer: assign({
        timer: (context) => {
          if (context.timer === 20) {
            return 30; 
          } else if (context.timer === 30) {
            return 5; 
          } 
          
          
          
          else {
            return 30; 
          }
        },
      }),
      subtractTime: assign({
        timer: (context) => Math.max(context.timer - 10, 0),
      }),
    },
  }
);

export default trafficLightMachine;
