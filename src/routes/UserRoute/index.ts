import { ApiRoute } from "../../utils/routeManager";
import { userAddRoute } from "./userAddRoute";
import { userCurrentRoute } from "./userCurrentRoute";
import { userLoginRoute } from "./userLoginRoute";
import { userProfileRoute } from "./userProfileRoute";

export const userRoutes: Array<ApiRoute> = [
  userAddRoute,
  userLoginRoute,
  userCurrentRoute,
  userProfileRoute,
];
