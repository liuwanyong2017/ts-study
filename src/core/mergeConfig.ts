import {RequestConfig} from "../types";

function defaultStrat(val1: any, val2: any): any {
  return val2 !== undefined ? val2 : val1;
}

function stratFromval2(val1: any, val2: any): any {
  if (val2 !== undefined) return val2;
}

const keysFromVal2 = ["url", "data", "params"];

const strats = Object.create(null);
keysFromVal2.map(
  key => strats[key] = stratFromval2
);

export const mergeConfig = (config1: RequestConfig, config2?: RequestConfig): RequestConfig => {
  config2 = config2 || {};


  const config = Object.create(null);  //无原型！
  for (let key in config2) {
    mergeField(key);
  }
  for (let key in config1) {
    if (config2 === undefined) {
      mergeField(key);
    }
  }


  function mergeField(k: string) {
    let strat = strats[k] || defaultStrat;
    config[k] = strat(config1[k], config2![k]);  //强制断言不是undefined ,上面预留了
  }

  return config;
};
