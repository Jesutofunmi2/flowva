import "./SignUp.scss";
import { LoginLayout } from "../../../layouts";
import PrimaryComponents from "../../../components/primaryComponents";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import SignupLogic from "./SignupLogic";
import SignUpFormValidation from "./SignupValidation";
import { Controller } from "react-hook-form";
import Images from "../../../assets/images";
const Signup = () => {
  const {
    email,
    password,
    signup,
    setPassword,
    setEmail,
    isSigning,
    errorMessage,
    confirmPassword,
    setConfirmPassword,
    signInWithGoogle,
    message,
  } = SignupLogic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = SignUpFormValidation(email, password, confirmPassword);
  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <LoginLayout>
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-header">
              <h4 className="light-purple--text font-weight-bold">
                Create Your Account
              </h4>
              <p className="small-text-size">Sign up to manage your tools</p>
            </div>

            <form onSubmit={handleSubmit(signup)} className="login__form">
              {errorMessage && (
                <p className="error--squared mb-1">{errorMessage}</p>
              )}
              {message && <p className="success--squaredRadius">{message}</p>}
              <div className="form-group">
                <Controller
                  name="email"
                  control={control}
                  defaultValue={email}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Email"
                      placeholder="your@example.com"
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
                      placeholder="......."
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

              <div className="mb-1">
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue={confirmPassword}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.PasswordInputField
                      label="Confirm Password"
                      name="confirmPassword"
                      className="white"
                      placeholder="......."
                      errorMessage={errors.confirmPassword}
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setConfirmPassword(value);
                      }}
                      onKeyUp={() =>
                        errors.confirmPassword !== undefined &&
                        trigger("confirmPassword")
                      }
                      register={register}
                    />
                  )}
                />
              </div>

              <PrimaryComponents.Button
                classNames="btn btn--primary cover"
                type="submit"
                isDisabled={isSigning}
                isLoading={isSigning}
                loadingText="Signing Up..."
              >
                Sign Up Account
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
              onClick={signInWithGoogle}
              isDisabled={isSigning}
              isLoading={isSigning}
              loadingText="Creating..."
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
                to="/login"
                className="purple--text smallest-text-size font-weight-bold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </LoginLayout>
    </Motion.div>
  );
};

export default Signup;
