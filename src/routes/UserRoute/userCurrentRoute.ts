import { body } from "express-validator";
import { authenticateUserHandler } from "../../middlewares/authenticateUserHandler";
import { UserDocument } from "../../models/userModel";
import { ApiRoute } from "../../utils/routeManager";

export const userCurrentRoute: ApiRoute = {
  url: "/current",
  method: "post",
  middlewares: [authenticateUserHandler()],
  controller: (req, res) => {
    const {
      role,
      profile: { ughId, src },
    } = req.currentUser as UserDocument;
    res.json({ user: { ughId, role, src } });
  },
};
