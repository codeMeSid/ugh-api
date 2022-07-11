import { ApiRoute } from "../../utils/routeManager";
import { userAddRoute } from "./userAddRoute";
import { userCurrentRoute } from "./userCurrentRoute";
import { userLoginRoute } from "./userLoginRoute";

export const userRoutes: Array<ApiRoute> = [
  userAddRoute,
  userLoginRoute,
  userCurrentRoute,
];
