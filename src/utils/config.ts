import convict from "convict";

export const config = convict({
  PORT: {
    doc: "SERVER PORT",
    default: 4000,
    arg: "PORT",
    env: "PORT",
  },
  LOG_LEVEL: {
    doc: "LOG LEVEL TYPE",
    default: "debug",
    arg: "LOG_LEVEL",
  },
  MONGO_URI: {
    doc: "Connection URI for Mongo DB",
    default:
      "mongodb+srv://siddhant:tAOdBjJMrQd97RbY@ugh.0clqp.mongodb.net/ugh",
    arg: "MONGO_URI",
    env: "MONGO_URI",
  },
});
