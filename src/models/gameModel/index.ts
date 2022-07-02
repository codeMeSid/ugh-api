import mongoose from "mongoose";

interface GameAttrs {}
interface GameDocument extends mongoose.Document {}
interface GameModel extends mongoose.Model<GameDocument> {}
const GameSchema = new mongoose.Schema<GameDocument, GameModel>(
  {},
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
GameSchema.statics.build = (attrs: GameAttrs) => new Games(attrs);
export const Games = mongoose.model<GameDocument, GameModel>(
  "GAMES",
  GameSchema
);
//  name: string;
//  console: string;
//  participants: Array<number>;
//  winners: Array<number>;
//  groups: Array<GameGroups>;
//  imageUrl: string;
//  thumbnailUrl: string;
//  isActive: boolean;
//  cutoff: number;
//  gameType: GameType;
//  rules: string;
