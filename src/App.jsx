import { Outlet } from "react-router-dom";
import "./assets/styles/index.scss";
import "./assets/styles/base/globalPage.scss";
import Routes from "./routes/Routes.jsx";

const App = () => {
  return (
    <Routes>
      <Outlet />
    </Routes>
  );
}

export default App
