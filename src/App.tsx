import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/user/constants/paths";

import HomePage from "@/user/pages/home";
import GuidePage from "@/user/pages/guide";
import { LoginPage } from "@/user/pages/account/login";
import { SignUpPage } from "@/user/pages/account/signup";
import { ProductDetail } from "@/user/pages/product/product-detail";
import { BlogDetailPage } from "@/user/pages/blog/blog-detail";
import { BlogPage } from "@/user/pages/blog/blog";
import { NotFound } from "@/user/components/ui/not-found";
import SearchPage from "@/user/pages/search";
import LineCallback from "@/user/pages/account/line-callback";
import { ResetPasswordPage } from "@/user/pages/account/reset-password";
import { ForgotPasswordPage } from "@/user/pages/account/forgot-password";
import { AccountManagement } from "@/user/pages/account/account-management";
import { AddressManagement } from "@/user/pages/account/address-management";
import { CartPage } from "@/user/pages/cart";
import { PaymentPage } from "./user/pages/payment/payment";

import { PaymentFailed } from "./user/pages/payment/payment-fail";
import { PaymentSuccess } from "./user/pages/payment/payment-success";
import { ResetPasswordRequestSuccess } from "./user/pages/account/send-email-sucess";
import CollectionPage from "./user/pages/collections";

import { RequireAuth } from "./components/guard/require-auth";
import { RequireGuest } from "./components/guard/require-guest";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTE */}
      <Route index element={<HomePage />} path={PATHS.HOME} />
      <Route element={<SignUpPage />} path={PATHS.SIGN_UP} />
      <Route element={<ProductDetail />} path={PATHS.PRODUCT_DETAIL} />
      <Route element={<SearchPage />} path={PATHS.SEARCH} />
      <Route element={<CollectionPage />} path={PATHS.COLLECTION} />
      <Route element={<BlogPage />} path={PATHS.BLOG} />
      <Route element={<BlogDetailPage />} path={PATHS.BLOG_DETAIL} />
      <Route element={<GuidePage />} path={PATHS.GUIDE} />
      <Route path="/line/callback" element={<LineCallback />} />
      <Route
        element={<ResetPasswordRequestSuccess />}
        path={"/forgot-password/success"}
      />
      {/* PUBLIC ROUTE */}

      {/* GUEST ONLY ROUTES */}
      <Route element={<RequireGuest />}>
        <Route element={<LoginPage />} path={PATHS.LOGIN} />
        <Route element={<ForgotPasswordPage />} path={PATHS.FORGOT_PASSWORD} />
        <Route element={<ResetPasswordPage />} path={PATHS.RESET_PASSWORD} />
      </Route>
      {/* GUEST ONLY ROUTES */}

      {/* PROTECT ROUTES */}
      <Route element={<RequireAuth />}>
        <Route element={<AccountManagement />} path={PATHS.ACCOUNT} />
        <Route element={<AddressManagement />} path={PATHS.ADDRESS} />
        <Route element={<CartPage />} path={PATHS.CART} />
        <Route element={<PaymentPage />} path={PATHS.PAYMENT} />
        <Route element={<PaymentFailed />} path={"/payment/failed"} />
        <Route element={<PaymentSuccess />} path={"/payment/success"} />
      </Route>

      {/* PROTECT ROUTES */}

      <Route element={<NotFound />} path="*"></Route>
    </Routes>
  );
}

export default App;
