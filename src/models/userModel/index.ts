import mongoose from "mongoose";
import { UserOnDate } from "./UserDate";
import { UserHistory } from "./UserHistory";
import { UserProfile } from "./UserProfile";
import { UserSocialType } from "./UserSocialType";
import { UserStatus } from "./UserStatus";
import { UserWallet } from "./UserWallet";

interface UserAttrs {
  name: string;
  ughId: string;
  email: string;
  dateOfBirth: Date;
  mobile: string;
}
export interface UserDocument extends mongoose.Document {
  profile: UserProfile;
  wallet: UserWallet;
  history: UserHistory;
  onDate: UserOnDate;
}
interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttrs): UserDocument;
}
const UserSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    profile: {
      name: { type: String, required: true },
      status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.CREATED,
      },
      dob: Date,
      src: String,
      email: String,
      bio: String,
      password: { type: String, required: true },
      ughId: { type: String, required: true },
      mobile: { type: String, required: true },
      social: {
        socialId: String,
        socialType: {
          type: String,
          enum: Object.values(UserSocialType),
        },
      },
      gamer: {
        psnId: String,
        streamId: String,
        gamerTagId: String,
        twitchId: String,
        discordId: String,
      },
      idProof: {
        aadharCard: { id: String, src: String },
        panCard: { id: String, src: String },
      },
    },
    wallet: {
      rewardCoins: { type: Number, default: 0 },
      winCoins: { type: Number, default: 0 },
      shopCoins: { type: Number, default: 0 },
    },
    history: {
      profileChange: [
        {
          field: String,
          value: String,
          onDate: { type: Date, default: new Date() },
        },
      ],
      tournaments: [
        {
          detail: { type: mongoose.SchemaTypes.ObjectId, ref: "TOURNAMENTS" },
          position: { type: Number, default: 0 },
          winCoins: { type: Number, default: 0 },
          wasWinner: { type: Boolean, default: false },
        },
      ],
      games: [
        {
          detail: { type: mongoose.SchemaTypes.ObjectId, ref: "GAMES" },
          points: { type: Number, default: 0 },
          wasWinner: { type: Boolean, default: false },
          dispute: {
            wasDisputed: { type: Boolean, default: false },
            disputedBy: { type: mongoose.SchemaTypes.ObjectId, ref: "USERS" },
            wasWinner: { type: Boolean, default: false },
            src: String,
          },
        },
      ],
    },
    onDate: {
      create: { type: Date, default: new Date() },
      active: { type: Date },
      update: { type: Date, default: new Date() },
      banned: { type: Date },
      verified: { type: Date },
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// password: string;
UserSchema.statics.build = (attrs: UserAttrs) => {
  const user = new Users();
  user.profile.name = attrs.name;
  user.profile.ughId = attrs.ughId;
  user.profile.email = attrs.email;
  user.profile.dob = attrs.dateOfBirth;
  user.profile.mobile = attrs.mobile;
  return user;
};

export const Users = mongoose.model<UserDocument, UserModel>(
  "USERS",
  UserSchema
);
