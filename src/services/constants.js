import { getToken } from "../services/auth.service";

export const AUTH_TOKEN = {
  Authorization: `JWT ${getToken()}`,
  "Content-Type": "application/json"
};


