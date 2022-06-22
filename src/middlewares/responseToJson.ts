import { Controller } from "../utils/routeManager";

export const responseToJson = (): Controller => (req, res, nextFunc) => {
  const resJson = res.json;
  res.json = function (data: any) {
    res.json = resJson;
    const success = !("success" in data);
    if (!success) delete data.success;
    return res.json({ success, payload: data });
  };
  nextFunc();
};
