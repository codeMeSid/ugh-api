import { decrypt, encrypt } from "../utils/crypt";
import { ApiRoute } from "../utils/routeManager";
import { faker } from "@faker-js/faker";
import { Users } from "../models/userModel";

export const testerRoutes: Array<ApiRoute> = [
  {
    url: "/add/user",
    method: "get",
    middlewares: [],
    controller: async (req, res) => {
      const user = Users.build({
        name: faker.name.firstName(),
        dateOfBirth: faker.date.past(20),
        email: faker.internet.email(),
        mobile: faker.phone.number("##########"),
        ughId: faker.internet.avatar(),
      });
      user.profile.password = await encrypt("password");
      await user.save();
      res.json(user);
    },
  },
];
