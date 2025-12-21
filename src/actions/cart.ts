import axiosClient from "@/lib/constants/axios-instant";
import axios from "axios";

export const getCart = async () => {
  try {
    const response = await axiosClient.get("/api/v1/cart/get-user-cart");

    return {
      success: true,
      data: response?.data,
      message: response?.data.message ?? "Get cart successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Get cart failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const addToCart = async (data: { id: string; quantity: number }) => {
  try {
    const response = await axiosClient.post("/api/v1/cart/add-to-cart", data);

    return {
      success: true,
      data: response?.data.result,
      message: response?.data.message ?? "Add to cart successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Add to cart failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const updateCart = async (data: { id: string; quantity: number }) => {
  try {
    const response = await axiosClient.put("/api/v1/cart/cart-items", data);

    return {
      success: true,
      data: response?.data,
      message: response?.data.message ?? "Update to cart successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Update to cart failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const response = await axiosClient.delete(`api/v1/cart/cart-items/${id}`);

    return {
      success: true,
      data: response?.data,
      message: response?.data.message ?? "Remove product from cart successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Remove product from cart failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};
