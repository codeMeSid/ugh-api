import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { sign, verify } from "jsonwebtoken";
import { config } from "./config";
const AScrypt = promisify(scrypt);

export const encrypt = async (password: string) => {
  const salt = randomBytes(8);
  const pwd: any = await AScrypt(password, salt.toString("hex"), 8);
  return `${pwd.toString("hex")}.SB.${salt.toString("hex")}`;
};

export const decrypt = async (password: string, hexPassword: string) => {
  const hexSplit = hexPassword.split(".SB.");
  const salt = hexSplit[1];
  const pwd: any = await AScrypt(password, salt, 8);
  return pwd.toString("hex") === hexSplit[0];
};

export const generateAuthToken = (data: { key: string }) => {
  return sign(data, config.get("SECRET_KEY"));
};

export const decodeAuthToken = (token: string) => {
  try {
    return verify(token, config.get("SECRET_KEY")) as { key: string };
  } catch (error) {
    return false;
  }
};
