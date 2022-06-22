import { UserSocialType } from "./UserSocialType";
import { UserStatus } from "./UserStatus";

export type UserProfile = {
  name: string;
  status: UserStatus;
  password: string;
  dob: Date;
  src: string;
  email: string;
  ughId: string;
  mobile: string;
  bio: string;
  social: {
    socialId: string;
    socialType: UserSocialType;
  };
  gamer: {
    psnId: string;
    streamId: string;
    gamerTagId: string;
    twitchId: string;
    discordId: string;
  };
  idProof: {
    aadharCard: { id: number; src: string };
    panCard: { id: number; src: string };
  };
};
