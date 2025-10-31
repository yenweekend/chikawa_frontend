import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/user/constants/paths";

import HomePage from "@/user/pages/home";
import { LoginPage } from "@/user/pages/account/login";
import { ProductDetail } from "@/user/pages/product/product-detail";
import { BlogDetailPage } from "@/user/pages/blog/blog-detail";
import { BlogPage } from "@/user/pages/blog/blog";
import { NotFound } from "@/user/components/ui/not-found";
import SearchPage from "@/user/pages/search";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={PATHS.HOME} />
      <Route element={<LoginPage />} path={PATHS.LOGIN} />
      <Route element={<ProductDetail  />} path={PATHS.PRODUCT_DETAIL} />
      <Route element={<SearchPage/>} path={PATHS.SEARCH}/>
      <Route element={<BlogPage />} path={PATHS.BLOG} />
      <Route element={<BlogDetailPage />} path={PATHS.BLOG_DETAIL} />

      <Route element={<NotFound />} path="/*"></Route>
    </Routes>
  );
}

export default App;
