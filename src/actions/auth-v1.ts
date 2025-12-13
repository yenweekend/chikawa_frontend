import axiosClient from "@/lib/constants/axios-instant";
import axios from "axios";
import type {
  ForgotPasswordFormData,
  LoginFormData,
  ResetPasswordFormData,
  SignUpFormData,
} from "@/user/schemas/auth";
import type { ApiResponse } from "@/types/auth";
import type { UserData } from "@/user/stores/signup-store";

export const lineCallback = (code: string) => {
  return axiosClient.post(`/api/v1/auth/line/callback?code=${code}`);
};

export const signUpCredential = async (
  formData: SignUpFormData
): Promise<ApiResponse<unknown>> => {
  const payload = {
    fullName: `${formData.firstName} ${formData.lastName}`,
    encryptedPassword: formData.password,
    email: formData.email,
  };
  try {
    // const response = await axiosClient.post("/api/v1/auth/register", payload);
    const response = await axios.post(
      "https://fearsome-ollie-correspondently.ngrok-free.dev/api/v1/auth/register",
      payload,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );

    return {
      success: true,
      data: response.data,
      message: "Register Successfully",
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message ?? "Register Failed",
      };
    }

    return {
      success: false,
      message: "Internal Server Error",
    };
  }
};

export const loginCredential = async (
  formData: LoginFormData
): Promise<ApiResponse<UserData>> => {
  try {
    const response = await axios.post(
      "https://fearsome-ollie-correspondently.ngrok-free.dev/api/v1/auth/login",
      {
        email: formData.email,
        password: formData.password,
      },

      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );

    return {
      success: true,
      data: response.data?.result,
      message: response.data?.message ?? "Login successful",
      token: response.headers["authorization"] ?? null,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Login failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const sendMailForgotPasswordAction = async (
  formData: ForgotPasswordFormData
) => {
  try {
    const response = await axios.post(
      "https://fearsome-ollie-correspondently.ngrok-free.dev/api/v1/auth/forgot-password",
      {
        email: formData.email,
      },

      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );

    return {
      success: true,
      data: response.data?.result,
      message: response.data?.message ?? "Send email successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Send email failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};

export const resetPasswordAction = async (
  token: string,
  formData: ResetPasswordFormData
) => {
  try {
    const response = await axios.post(
      `https://fearsome-ollie-correspondently.ngrok-free.dev/api/v1/auth/change-password?token=${token}`,
      {
        newPassword: formData.password,
      },
      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );

    return {
      success: true,
      data: response.data?.result,
      message: response.data?.message ?? "Change password successful",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Change password failed",
      };
    }

    return {
      success: false,
      message: "Unknown error occurred",
    };
  }
};
