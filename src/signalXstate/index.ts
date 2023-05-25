import { Machine } from "xstate";
import { config } from "./config";
import implementation from "./stateimplementation";
import { IContext } from "./types";

const context: IContext = {
  origGreenTime: 15,
  origYellowTime: 5,
  origRedTime: 15,
  greenTimer: 15,
  yellowTimer: 5,
  redTimer: 15,
};

const trafficLightMachine = Machine(
  {
    ...config,
    context,
  },
  implementation
);

export default trafficLightMachine;
