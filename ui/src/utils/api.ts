import { Configuration } from "../api";

export const getApiConfig = (accessToken?: string) => {
  return new Configuration({
    basePath: process.env.REACT_APP_BASE_URL,
    accessToken: accessToken,
  });
};
