import axiosClient from "@/lib/constants/axios-instant";

export const lineCallback = (code) => {
  return axiosClient.post(`/api/v1/auth/line/callback?code=${code}`);
};
