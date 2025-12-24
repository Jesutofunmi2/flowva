import "./ForgetPassword.scss";
import { LoginLayout } from "../../../layouts";
import PrimaryComponents from "../../../components/primaryComponents";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import ResetPasswordLogic from "./ForgetPasswordLogic";
import { Controller } from "react-hook-form";
import ForgetPasswordValidation from "./ForgetPasswordValidation";

const ForgetPassword = () => {
    const {
    email,
    forgetPassword,
    setEmail,
    isReseting,
    errorMessage,
    successMessage,
  } = ResetPasswordLogic();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = ForgetPasswordValidation(email);
  return (
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <LoginLayout>
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-header">
              <h4 className="light-purple--text font-weight-bold">
                Reset Password
              </h4>
              <p className="small-text-size">
                Enter your email to receive a reset link
              </p>
            </div>
            {/* login form section */}
            <form onSubmit={handleSubmit(forgetPassword)} className="login__form">
              {/* error message */}
              {errorMessage !== null && (
                <p className="error--squared mb-1">{errorMessage}</p>
              )}
              {successMessage !== null && (
                <p className="success--squaredRadius mb-1">{successMessage}</p>
              )}
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
              <PrimaryComponents.Button
                classNames="btn btn--primary cover"
                type="submit"
                isDisabled={isReseting}
                isLoading={isReseting}
                loadingText="Sending..."
              >
                Send Reset Link
              </PrimaryComponents.Button>
            </form>


            <p className="signup-link smallest-text-size">
              Remember your password? {" "}
              <Link
                to="/login"
                className="purple--text smallest-text-size font-weight-semibold"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </LoginLayout>
    </Motion.div>
  )
}

export default ForgetPassword;