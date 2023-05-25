import { MachineConfig } from "xstate";
import { IContext } from "./types";

export const config: MachineConfig<IContext, any, any> = {
  initial: "idle",
  states: {
    idle: {
      on: {
        START_TIMER: "green",
      },
    },
    red: {
      invoke: [
        {
          id: "start-timer",
          src: "startTimer",
        },
      ],
      on: {
        changeTimer: [
          {
            cond: "isRedTimesUp",
            target: "yellow",
            actions: ["resetYellowTimer"],
          },
          {
            actions: ["decrementRedTimer"],
          },
        ],
        SUBTRACT_TIME: {
          actions: "subtractTime",
        },
      },
    },
    
    yellow: {
      invoke: [
        {
          id: "start-timer",
          src: "startTimer",
        },
      ],
      on: {
        changeTimer: [
          {
            cond: "isYellowTimesUp",
            target: "green",
            actions: ["resetGreenTimer"],
          },
          {
            actions: ["decrementYellowTimer"],
          },
        ],
        SUBTRACT_TIME: {
          actions: "subtractTime",
        },
      },
    },
    green: {
      invoke: [
        {
          id: "start-timer",
          src: "startTimer",
        },
      ],
      on: {
        changeTimer: [
          {
            cond: "isGreenTimesUp",
            target: "red",
            actions: ["resetRedTimer"],
          },
          {
            actions: ["decrementGreenTimer"],
          },
        ],
        SUBTRACT_TIME: {
          actions: "subtractTime",
        },
      },
    },
  },
};
