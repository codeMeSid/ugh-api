import { consoleLog } from "../utils/consoleLog";
import { Controller } from "../utils/routeManager";

// TODO to save Logs
export const interceptRequest = (): Controller => (req, res, nextFunc) => {
  consoleLog.info(req.url, "SERVER REQUEST");
  nextFunc();
};
