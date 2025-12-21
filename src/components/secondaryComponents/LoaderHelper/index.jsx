import Images from "../../../assets/images";
const LoaderHelper = ({ children, isLoading, classNames }) => {
  return (
    <>
      {isLoading ? (
        <div
          className={`${classNames}`}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "5px",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <img
            src={Images.logo}
            width={"130px"}
            alt="FlowvaHub"
            className="google-signin__icon"
          />
          <p className="dark--text">Redirecting...</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoaderHelper;
