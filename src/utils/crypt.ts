import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
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
