import { Outlet } from "react-router-dom";
import "./assets/styles/index.scss";
import "./assets/styles/base/globalPage.scss";
import Routes from "./routes/Routes.jsx";
import { ApiErrorHandler } from "./components/common";

const App = () => {
  return (
    <Routes>
       <ApiErrorHandler>
         <Outlet />
      </ApiErrorHandler>
    </Routes>
  );
}

export default App;
