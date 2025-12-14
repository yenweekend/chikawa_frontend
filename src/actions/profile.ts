import axiosClient from "@/lib/constants/axios-instant";
import type { AddressFormData } from "@/user/schemas/address";
import axios from "axios";

export const getAddressAction = async () => {
  try {
    const response = await axiosClient.get("/api/v1/users/profile");
    return {
      success: true,
      data: response.data,
      message: response?.data.message ?? "Get address successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Get Address failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const addAddressAction = async (formData: AddressFormData) => {
  try {
    const response = await axiosClient.post("/api/v1/address", formData);
    return {
      success: true,
      message: response?.data.message ?? "Add address successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Add Address failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const updateAddressAction = async (
  formData: AddressFormData,
  id: number
) => {
  try {
    const response = await axiosClient.put(`/api/v1/address/${id}`, formData);
    return {
      success: true,
      message: response?.data.message ?? "Update address successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Update Address failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const deleteAddressAction = async (id: number) => {
  try {
    const response = await axiosClient.delete(`/api/v1/address/${id}`);
    return {
      success: true,
      message: response?.data.message ?? "Delete address successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Delete Address failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const logoutAction = async () => {
  try {
    const response = await axiosClient.post("/api/v1/auth/logout");
    return {
      success: true,
      message: response?.data.message ?? "Logout successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Logout failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};
