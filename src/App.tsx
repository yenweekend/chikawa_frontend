import { Route, Routes } from "react-router-dom";

import { PATHS } from "@/user/constants/paths";

import HomePage from "@/user/pages/home";
import { LoginPage } from "@/user/pages/account/login";
import { ProductDetail } from "@/user/pages/product/product-detail";
import { NotFound } from "@/user/components/ui/not-found";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={PATHS.HOME} />
      <Route element={<LoginPage />} path={PATHS.LOGIN} />
      <Route element={<ProductDetail  />} path={PATHS.PRODUCT_DETAIL} />

      <Route element={<NotFound />} path="/*"></Route>
    </Routes>
  );
}

export default App;
