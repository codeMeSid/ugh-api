import { authenticateUserHandler } from "../../middlewares/authenticateUserHandler";
import { UserDocument } from "../../models/userModel";
import { ApiRoute } from "../../utils/routeManager";

export const userProfileRoute: ApiRoute = {
  url: "/get/profile",
  method: "post",
  middlewares: [authenticateUserHandler()],
  controller: (req, res) => {
    const { profile, wallet, history } = req.currentUser as UserDocument;
    res.json({ profile, wallet, history });
  },
};
