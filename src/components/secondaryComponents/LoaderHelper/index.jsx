import Images from "../../../assets/images";
const LoaderHelper = ({ children, isLoading, classNames, action= "Redirecting..." }) => {
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
            minHeight: "60vh",
          }}
        >
          <img
            src={Images.logo}
            width={"130px"}
            alt="FlowvaHub"
            className="google-signin__icon"
          />
          <p className="dark--text">{action}</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoaderHelper;
