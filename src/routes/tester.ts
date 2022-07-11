import { decrypt, encrypt } from "../utils/crypt";
import { ApiRoute } from "../utils/routeManager";
import { faker } from "@faker-js/faker";
import { Users } from "../models/userModel";

export const testerRoutes: Array<ApiRoute> = [
  {
    url: "/delete/user/all",
    method: "get",
    middlewares: [],
    controller: async (req, res) => {
      await Users.deleteMany();
      res.json({ msg: "Done" });
    },
  },
];
