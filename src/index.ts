import "express-async-errors";
import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { config } from "./utils/config";
import { consoleLog } from "./utils/consoleLog";
import { mongoConnect } from "./utils/mongoConnect";
import { routeManager } from "./utils/routeManager";
import { testerRoutes } from "./routes/tester";
import { interceptRequest } from "./middlewares/interceptRequest";
import { responseToJson } from "./middlewares/responseToJson";
import { CustomError, errorHandler } from "./middlewares/errorHandler";
import { userRoutes } from "./routes/UserRoute";

async function startServer() {
  try {
    // constants
    const PORT = config.get("PORT");
    const MONGO_URI = config.get("MONGO_URI");
    const app = express();
    // plugins
    app.use(bodyParser.json());
    app.use(compression());
    app.use(helmet());
    app.use(cors());
    app.use(interceptRequest());
    app.use(responseToJson());
    // routes
    routeManager.registerRoute("/test", testerRoutes);
    routeManager.registerRoute("/user", userRoutes);
    app.use("/api/ugh/sb", routeManager.generateRoutes());
    app.use("*", function (req, res) {
      throw new CustomError("NotFoundError", ["Api Path Not found"]);
    });
    // servers
    app.use(errorHandler);
    await mongoConnect(MONGO_URI);
    app.listen(PORT, () => consoleLog.info(`SERVICE ON ${PORT}`));
  } catch (error: any) {
    consoleLog.error(error?.message);
  }
}

startServer();
