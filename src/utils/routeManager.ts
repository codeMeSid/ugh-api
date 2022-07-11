import { NextFunction, Request, Response, Router } from "express";
import { UserDocument } from "../models/userModel";

interface UGHRequest extends Request {
  currentUser?: UserDocument;
}

export type Controller = (
  req: UGHRequest,
  res: Response,
  nextFunc: NextFunction
) => any;
export type ApiRoute = {
  url: string;
  method: "get" | "post" | "put" | "delete";
  middlewares: Array<Controller>;
  controller: Controller;
};
type DomainRoutes = { domain: string; api: Array<ApiRoute> };

class RouterManager {
  private routes: Array<DomainRoutes> = [];
  private router = Router();

  registerRoute(domainUrl: string, domainApi: Array<ApiRoute>) {
    this.routes.push({ domain: domainUrl, api: domainApi });
  }
  generateRoutes() {
    this.routes.forEach(({ api, domain }) => {
      api.forEach(({ url, method, middlewares, controller }) => {
        this.router[method](`${domain}${url}`, ...middlewares, controller);
      });
    });
    return this.router;
  }
}

export const routeManager = new RouterManager();
