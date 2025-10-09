import { Route, Routes } from "react-router-dom";
import HomePage from "@/user/pages/home";
import { LoginPage } from "@/user/pages/account/login";
import { PATHS } from "@/user/constants/paths";
import { NotFound } from "@/user/components/ui/not-found";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={PATHS.HOME} />
      <Route element={<LoginPage />} path={PATHS.LOGIN} />

      <Route element={<NotFound />} path="/*"></Route>
    </Routes>
  );
}

export default App;
