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

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={PATHS.HOME} />

      <Route element={<LoginPage />} path={PATHS.LOGIN} />
      <Route element={<SignUpPage />} path={PATHS.SIGN_UP} />
      <Route element={<ForgotPasswordPage />} path={PATHS.FORGOT_PASSWORD} />
      <Route element={<ResetPasswordPage />} path={PATHS.RESET_PASSWORD} />

      <Route element={<ProductDetail />} path={PATHS.PRODUCT_DETAIL} />
      <Route element={<SearchPage />} path={PATHS.SEARCH} />
      <Route element={<BlogPage />} path={PATHS.BLOG} />
      <Route element={<BlogDetailPage />} path={PATHS.BLOG_DETAIL} />
      <Route element={<GuidePage />} path={PATHS.GUIDE} />
      <Route path="/line/callback" element={<LineCallback />} />

      <Route element={<NotFound />} path="/*"></Route>
    </Routes>
  );
}

export default App;
