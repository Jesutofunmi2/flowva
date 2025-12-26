import "./Login.scss";
import { LoginLayout } from "../../../layouts";
import PrimaryComponents from "../../../components/primaryComponents";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import LoginLogic from "./LoginLogic";
import LoginFormValidation from "./LoginValidation";
import { Controller } from "react-hook-form";
import Images from "../../../assets/images";

const Login = () => {
  const {
    email,
    password,
    login,
    setPassword,
    setEmail,
    isLogging,
    errorMessage,
    signInWithGoogle,
  } = LoginLogic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = LoginFormValidation(email, password);

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <LoginLayout>
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-header">
              <h4 className="light-purple--text font-weight-bold">
                Log in to flowva
              </h4>
              <p className="small-text-size">
                Log in to receive personalized recommendations
              </p>
            </div>
            <form onSubmit={handleSubmit(login)} className="login__form">
              {errorMessage && <p className="error--squared text-center mb-1">{errorMessage}</p>}
              <div className="form-group">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={email}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Email"
                      placeholder="user@example.com"
                      name="email"
                      className="white"
                      errorMessage={errors.email}
                      onKeyUp={() =>
                        errors.email !== undefined && trigger("email")
                      }
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setEmail(value);
                      }}
                      register={register}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Controller
                  name="password"
                  control={control}
                  defaultValue={password}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.PasswordInputField
                      label="Password"
                      name="password"
                      className="white"
                      placeholder="....."
                      errorMessage={errors.password}
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setPassword(value);
                      }}
                      onKeyUp={() =>
                        errors.password !== undefined && trigger("password")
                      }
                      register={register}
                    />
                  )}
                />
              </div>
              <div className="text-end">
                <Link
                  className="purple--text smallest-text-size font-weight-medium"
                  to="/forget-password"
                  data-testid="forgot-password-btn"
                >
                  Forgot password?
                </Link>
              </div>
              <PrimaryComponents.Button
                classNames="btn btn--primary cover"
                type="submit"
                isDisabled={isLogging}
                isLoading={isLogging}
                loadingText="Logging..."
              >
                Sign In
              </PrimaryComponents.Button>
            </form>
            <div className="login-page__or-separator">
              <span
                className="smallest-text-size font-weight-normal"
                style={{ color: "#A78BFA" }}
              >
                or
              </span>
            </div>
            <PrimaryComponents.Button
              classNames="btn btn--outline cover"
              type="button"
              loadingText="Connecting..."
              onClick={signInWithGoogle}
              isDisabled={isLogging}
              isLoading={isLogging}
            >
              <div className="google-signin">
                <img
                  src={Images.GoogleIcon}
                  alt="Google Icon"
                  className="google-signin__icon"
                />
                <span>Sign in with Google</span>
              </div>
            </PrimaryComponents.Button>

            <p className="signup-link smallest-text-size">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="purple--text smallest-text-size font-weight-semibold"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </LoginLayout>
    </Motion.div>
  );
};

export default Login;
