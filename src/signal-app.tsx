import { createMachine, assign } from 'xstate';

const trafficLightMachine = createMachine(
  {
    id: 'trafficLight',
    initial: 'red',
    context: {
      timer: 30,
    },
    states: {
      red: {
        entry: 'resetTimer',
        on: {
          TIMER: { actions: 'decrementTimer' },
          CHANGE_SIGNAL: {
            target: 'green',
            cond: (context, event) => event.signal === 'green',
          },
          SUBTRACT_TIME: { actions: 'subtractTime' },
        },
        after: {
          3000: 'green',
        },
      },
      yellow: {
        entry: 'resetTimer',
        on: {
          TIMER: { actions: 'decrementTimer' },
          CHANGE_SIGNAL: {
            target: 'red',
            cond: (context, event) => event.signal === 'red',
          },
          SUBTRACT_TIME: { actions: 'subtractTime' },
        },
        after: {
          5000: 'red',
        },
      },
      green: {
        entry: 'resetTimer',
        on: {
          TIMER: { actions: 'decrementTimer' },
          CHANGE_SIGNAL: {
            target: 'yellow',
            cond: (context, event) => event.signal === 'yellow',
          },
          SUBTRACT_TIME: { actions: 'subtractTime' },
        },
        after: {
          2000: 'yellow',
        },
      },
    },
  },
  {
    actions: {
      decrementTimer: assign({
        timer: (context) => Math.max(context.timer - 1, 0),
      }),
      resetTimer: assign({
        timer: (_, event) => {
          const { type } = event;
          const target = type.substring(type.lastIndexOf('.') + 1);
          switch (target) {
            case 'red':
              return 30;
            case 'yellow':
              return 5;
            case 'green':
              return 20;
            default:
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
