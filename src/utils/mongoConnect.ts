import mongoose from "mongoose";
import { consoleLog } from "./consoleLog";

export async function mongoConnect(connectUri: string) {
  return new Promise((res, rej) => {
    return mongoose.connect(connectUri, {}, (error) => {
      if (error) rej(error.message);
      else {
        consoleLog.info("DB SERVICE UP");
        res(true);
      }
    });
  });
}
