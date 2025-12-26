import ResetPasswordCallbackValidation from "./ResetPasswordCallbackValidation";
import useResetPasswordCallback from "./useResetPasswordCallback";
import { Controller } from "react-hook-form";
import PrimaryComponents from "../../../components/primaryComponents";
import { LoginLayout } from "../../../layouts";
import { motion as Motion } from "framer-motion";
import "../ForgetPassword/ForgetPassword.scss";

const ResetPasswordCallback = () => {
  const { error, isReseting, newPassword, setNewPassword, resetPassword } =
    useResetPasswordCallback();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
  } = ResetPasswordCallbackValidation(newPassword);

  return (
    <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <LoginLayout>
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-header">
              <h4 className="light-purple--text font-weight-bold">
                Save New Password
              </h4>
              <p className="small-text-size">Enter your new password</p>
            </div>
            <form
              onSubmit={handleSubmit(resetPassword)}
              className="login__form"
            >
              {error && <p className="error--text text-center mb-1">{error}</p>}
              <div className="form-group">
                <Controller
                  name="password"
                  control={control}
                  defaultValue={newPassword}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Password"
                      placeholder="New password"
                      name="password"
                      className="white"
                      errorMessage={errors.password}
                      onKeyUp={() =>
                        errors.password !== undefined && trigger("password")
                      }
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setNewPassword(value);
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
                loadingText="Saving..."
              >
                Save New Password
              </PrimaryComponents.Button>
            </form>
          </div>
        </div>
      </LoginLayout>
    </Motion.div>
  );
};

export default ResetPasswordCallback;
