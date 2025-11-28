import axios from "axios";

import type { ProductSearchParams } from "@/user/types/products";

const API_HOST = "https://fearsome-ollie-correspondently.ngrok-free.dev/";

export const search = async (params: ProductSearchParams) => {
  const response = await axios.get(`${API_HOST}//api/v1/search`);
};
