import mongoose from "mongoose";
import { ConsoleOnDate } from "./ConsoleDate";
import { ConsoleStatus } from "./ConsoleStatus";

interface ConsoleAttrs {
  name: string;
  src: string;
}
interface ConsoleDocument extends mongoose.Document {
  name: string;
  src: string;
  status: ConsoleStatus;
  onDate: ConsoleOnDate;
}
interface ConsoleModel extends mongoose.Model<ConsoleDocument> {
  build(attrs: ConsoleAttrs): ConsoleDocument;
}
const ConsoleSchema = new mongoose.Schema<ConsoleDocument, ConsoleModel>(
  {
    name: { type: String, required: true },
    src: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(ConsoleStatus),
      default: ConsoleStatus.ACTIVATED,
    },
    onDate: {
      created: { type: Date, default: new Date() },
      updated: { type: Date, default: new Date() },
      deactivated: { type: Date },
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
ConsoleSchema.statics.build = (attrs: ConsoleAttrs) => new Consoles(attrs);
export const Consoles = mongoose.model<ConsoleDocument, ConsoleModel>(
  "CONSOLES",
  ConsoleSchema
);
