import "./Login.scss";
import { LoginLayout } from "../../../layouts";
import PrimaryComponents from "../../../components/primaryComponents";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import LoginLogic from "./LoginLogic";
import LoginFormValidation from "./LoginValidation";
import { Controller } from "react-hook-form";
import Images from "../../../assets/images";

const StudentLogin = () => {
  const {
    email,
    password,
    login,
    setPassword,
    setEmail,
    isLogging,
    errorMessage,
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
                Test Engine / Assessment Platform Solution,
              </h4>
              <p className="small-text-size">
                Log in to your Exam.
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
                      label="Username"
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
          </div>
        </div>
      </LoginLayout>
    </Motion.div>
  );
};

export default StudentLogin;
