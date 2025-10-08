import { Route, Routes } from "react-router-dom";
import HomePage from "@/user/pages/home";
import { PATHS } from "@/user/constants/paths";
import { NotFound } from "@/user/components/ui/not-found";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path={PATHS.HOME} />

      <Route element={<NotFound />} path="/*"></Route>
    </Routes>
  );
}

export default App;
