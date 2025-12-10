import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/user/constants/paths";

import HomePage from "@/user/pages/home";
import { LoginPage } from "@/user/pages/account/login";
import { SignUpPage } from "@/user/pages/account/signup";
import { ProductDetail } from "@/user/pages/product/product-detail";
import { BlogDetailPage } from "@/user/pages/blog/blog-detail";
import { BlogPage } from "@/user/pages/blog/blog";
import { NotFound } from "@/user/components/ui/not-found";
import SearchPage from "@/user/pages/search";
import { ChatbotDashboard } from "@/dashboard/chatbot";
import { User } from "@/dashboard/user";


function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={PATHS.HOME} />
      <Route element={<LoginPage />} path={PATHS.LOGIN} />
      <Route element={<SignUpPage />} path={PATHS.SIGN_UP} />
      <Route element={<ProductDetail />} path={PATHS.PRODUCT_DETAIL} />
      <Route element={<SearchPage />} path={PATHS.SEARCH} />
      <Route element={<BlogPage />} path={PATHS.BLOG} />
      <Route element={<BlogDetailPage />} path={PATHS.BLOG_DETAIL} />


      <Route element={<ChatbotDashboard />} path="/dashboard/chatbot" />
      <Route element={<User />} path="/dashboard/users" />

      <Route element={<NotFound />} path="/*"></Route>
    </Routes>
  );
}

export default App;
