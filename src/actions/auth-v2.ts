import axios from "axios";
import { SERVER_URL } from "@/lib/constants/common";

export const lineCallback = async (code) => {
  const url = `${SERVER_URL}/api/v1/auth/line/callback?code=${code}`;
  const res = await axios.post(url);
  return res.data;
};
