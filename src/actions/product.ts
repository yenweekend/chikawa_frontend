import axios from "axios";
import qs from "qs";

import type { ProductSearchParams } from "@/user/types/products";

const API_HOST = "https://fearsome-ollie-correspondently.ngrok-free.dev";

export const getSearchAction = async (params: ProductSearchParams) => {
  const response = await axios.get(`${API_HOST}/api/v1/search`, {
    params: params,
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
  return response;
};

export const getHomeData = async () => {
  const response = await axios.get(`${API_HOST}/api/v1/products/home`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response;
};

export const getProductDetailAction = async (productId: number) => {
  if (!productId) return;
  const response = await axios.get(`${API_HOST}/api/v1/products/${productId}`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });
  return response;
};
