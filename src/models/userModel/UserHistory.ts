import { UserDocument } from ".";

export type UserHistory = {
  profileChange: [{ field: string; value: string; on: Date }];
  tournaments: [
    { detail: any; position: number; winCoins: number; wasWinner: boolean }
  ]; // TODO replace any with tournament
  games: [
    {
      detail: any;
      points: number;
      wasWinner: boolean;
      dispute: {
        wasDisputed: boolean;
        disputedBy: UserDocument;
        wasWinner: boolean;
        src: string;
      };
    }
  ]; // TODO replace any with bracket/game, [winner] with enum
};
