import { jwtDecode } from "jwt-decode";

export const decodeToken = async (token: string) => {
  return await jwtDecode(token);
};
