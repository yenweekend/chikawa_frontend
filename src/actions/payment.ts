import axiosClient from "@/lib/constants/axios-instant";
import type { Address } from "@/user/types/profile";
import axios from "axios";

type CheckoutRequest = {
  items: {
    id: string;
    image: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }[];
  address: Address;
};

export const checkoutAction = async (data: CheckoutRequest) => {
  try {
    const response = await axiosClient.post(`/api/v1/cart/checkout`, data);
    return {
      success: true,
      data: response.data.result,
      message: response?.data.message ?? "Check payment successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Check payment failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const payAction = async (orderId: string) => {
  try {
    const response = await axiosClient.post(`api/v1/payment/checkout`, {
      orderId: orderId,
    });
    return {
      success: true,
      data: response.data.result,
      message: response?.data.message ?? "Payment successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Payment failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};
