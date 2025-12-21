import Images from "../../../assets/images";
import PrimaryComponents from "../../../components/primaryComponents";
import { pathConstants } from "../../../routes/pathContants";
import "./404Page.scss";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <img
        width="250px"
        src={Images.notFoundImage}
        className="error__404"
        alt="error"
      />
      <div className="mb-3 mt-4 error-page">
        <h4>Something went wrong!</h4>
        <p className="mb-0">
          The page you are looking for must have been removed, renamed or it is
          yet to exist.
        </p>
      </div>
      <PrimaryComponents.Button
        className="btn btn--primary px-5"
        onClick={() => navigate(pathConstants?.LOGIN)}
      >
        Return to Home
      </PrimaryComponents.Button>
    </div>
  );
};

export default Error404;
