import { body } from "express-validator";
import { ApiRoute } from "../../utils/routeManager";
import { Users } from "../../models/userModel";
import { decrypt, generateAuthToken } from "../../utils/crypt";
import { CustomError } from "../../middlewares/errorHandler";

export const userLoginRoute: ApiRoute = {
  url: "/sign-in",
  method: "post",
  middlewares: [body("password").notEmpty().withMessage("Required")],
  controller: async (req, res) => {
    const { ughId, email, mobile, password } = req.body;
    let filter = {};
    if (ughId) filter = { "profile.ughId": ughId };
    else if (email) filter = { "profile.email": email };
    else if (mobile) filter = { "profile.mobile": mobile };
    const user = await Users.findOne(filter);
    if (!user) return res.json({ isRegistrationRequired: true });
    const isPasswordMatch = await decrypt(password, user.profile.password);
    if (!isPasswordMatch)
      throw new CustomError("BadRequestError", ["Invalid Credentials"]);
    res.json({
      userCredentials: {
        key: generateAuthToken({ key: `${user._id}` }),
      },
    });
  },
};
