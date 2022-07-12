import dayjs from "dayjs";
import { body, check } from "express-validator";
import { CustomError } from "../../middlewares/errorHandler";
import { validateHandler } from "../../middlewares/validateHandler";
import { Users } from "../../models/userModel";
import { encrypt } from "../../utils/crypt";
import { ApiRoute } from "../../utils/routeManager";

export const userAddRoute: ApiRoute = {
  url: "/add",
  method: "post",
  middlewares: [
    check("name").notEmpty().withMessage("Required"),
    body("ughId").custom(async (value) => {
      if (!value) throw new CustomError("BadRequestError", ["required"]);
      const user = await Users.findOne({ "profile.ughId": value });
      if (user) throw new CustomError("BadRequestError", ["already taken"]);
      else return true;
    }),
    body("dateOfBirth").custom((value) => {
      const dateValue = new Date(value);
      if (dayjs().diff(dateValue, "years") < 16)
        throw new CustomError("BadRequestError", ["less than 16 years old"]);
      else return true;
    }),
    body("email")
      .optional(true)
      .isEmail()
      .custom(async (value) => {
        if (value) {
          const user = await Users.findOne({ "profile.email": value });
          if (user)
            throw new CustomError("BadRequestError", ["already exists"]);
        } else return true;
      }),
    body("mobile")
      .isLength({ min: 10, max: 10 })
      .custom(async (value) => {
        const user = await Users.findOne({ "profile.mobile": value });
        if (user) throw new CustomError("BadRequestError", ["already exists"]);
      }),
    body("password")
      .isLength({ min: 8, max: 32 })
      .withMessage("required to secure account"),
    validateHandler(),
  ],
  controller: async function (req, res) {
    const { name, ughId, dateOfBirth, email, mobile, password } = req.body;
    const user = Users.build({ name, dateOfBirth, ughId, email, mobile });
    user.profile.password = await encrypt(password);
    await user.save();
    res.json({ otp: user.verfication.otp });
  },
};
