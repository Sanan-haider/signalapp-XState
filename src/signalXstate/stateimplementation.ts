import { assign, MachineOptions } from "xstate";
import { IContext } from "./types";

const implementation: MachineOptions<IContext, any> = {
  services: {
    startTimer: (_context, _event: any) => (send: any) => {
      const interval = setInterval(() => {
        send("changeTimer");
        
      }, 1000);
      return () => clearInterval(interval);
    },
  },
  actions: {
    decrementGreenTimer: assign({
      greenTimer: (context) =>
        context.greenTimer > 0 ? context.greenTimer - 1 : 0,
    }),
    decrementRedTimer: assign({
      redTimer: (context) => (context.redTimer > 0 ? context.redTimer - 1 : 0),
    }),
    decrementYellowTimer: assign({
      yellowTimer: (context) =>
        context.yellowTimer > 0 ? context.yellowTimer - 1 : 0,
    }),
    resetGreenTimer: assign({
      greenTimer: ({ origGreenTime }) => origGreenTime,
    }),
    resetRedTimer: assign({ redTimer: ({ origRedTime }) => origRedTime }),
    resetYellowTimer: assign({
      yellowTimer: ({ origYellowTime }) => origYellowTime,
    }),
    subtractTime: assign((context) => {
      if (context.greenTimer > 0) {
        return { greenTimer: Math.max(context.greenTimer - 10, 0) };
      } else if (context.redTimer > 0) {
        return { redTimer: Math.max(context.redTimer - 10, 0) };
      } else if (context.yellowTimer > 0) {
        return { yellowTimer: Math.max(context.yellowTimer - 10, 0) };
      }
      return {};
    }),
   
  },

  guards: {
    isRedTimesUp: ({ redTimer }) => redTimer === 0,
    isGreenTimesUp: ({ greenTimer }) => greenTimer === 0,
    isYellowTimesUp: ({ yellowTimer }) => yellowTimer === 0,
  },
  activities: {},
  delays: {},
};

export default implementation;
