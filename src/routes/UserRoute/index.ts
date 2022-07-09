import { ApiRoute } from "../../utils/routeManager";
import { userAddRoute } from "./userAddRoute";
import { userLoginRoute } from "./userLoginRoute";

export const userRoutes: Array<ApiRoute> = [userAddRoute, userLoginRoute];
