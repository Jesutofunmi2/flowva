import PrimaryComponents from "../../../components/primaryComponents";
import { pathConstants } from "../../../routes/pathContants";
import "../Error404/404Page.scss";
import { useNavigate } from "react-router-dom";

const Error500 = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="mb-3 mt-4 error-page">
        <h4>Something went wrong!</h4>
        <p className="mb-0">Our team is currently investigating this problem</p>
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

export default Error500;
