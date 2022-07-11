import mongoose from "mongoose";
import { Users } from "../models/userModel";
import { UserStatus } from "../models/userModel/UserStatus";
import { decodeAuthToken } from "../utils/crypt";
import { Controller } from "../utils/routeManager";
import { CustomError } from "./errorHandler";

export const authenticateUserHandler =
  (): Controller => async (req, res, nextFunc) => {
    const { userCredentials } = req.body;
    if (!userCredentials)
      throw new CustomError("UnAuthorised", ["Un-Authroised Access"]);
    const { key } = userCredentials;
    if (!key) throw new CustomError("UnAuthorised", ["Un-Authroised Access"]);
    const decryptedKey = decodeAuthToken(key);
    if (!decryptedKey)
      throw new CustomError("UnAuthorised", ["Un-Authroised Access"]);
    const user = await Users.findById(decryptedKey.key);
    if (!user) throw new CustomError("UnAuthorised", ["Un-Authroised Access"]);
    switch (user.profile.status) {
      case UserStatus.ACTIVE:
        req.currentUser = user;
        break;
      case UserStatus.BANNED:
        throw new CustomError("UnAuthorised", ["User Profile banned"]);
      case UserStatus.CREATED:
        throw new CustomError("UnAuthorised", ["User verification pending"]);
    }
    nextFunc();
  };
