import pino, { Logger } from "pino";
import { config } from "./config";

type LOG_BY = "SERVER REQUEST" | "SERVER RESPONSE";

class ConsoleLog {
  private log: Logger;
  constructor() {
    this.log = pino({
      level: config.get("LOG_LEVEL"),
      transport: { target: "pino-pretty", options: { colorize: true } },
    });
  }
  info(message: string, by?: LOG_BY) {
    if (!this.log) throw new Error("CONSOLE_LOG NOT WORKING");
    this.log.info(message, by);
  }
  error(message: string) {
    const by: LOG_BY = "SERVER RESPONSE";
    if (!this.log) throw new Error("CONSOLE_LOG NOT WORKING");
    this.log.error(message, by);
  }
}

export const consoleLog = new ConsoleLog();
