import React from "react";
import LoaderHelper from "../../../../components/secondaryComponents/LoaderHelper";
import globalStyles from "../../../../assets/styles/base/globalPage.module.scss";
import Validation from "./Validation";
import SecondaryComponents from "../../../../components/secondaryComponents";
import useCreateCandidate from "./useCreateCandidate";
import { Controller } from "react-hook-form";
import PrimaryComponents from "../../../../components/primaryComponents";

const CreateCandidate = () => {
  const {
    username,
    setUsername,
    setFullName,
    message,
    fullName,
    errorMessage,
    isCreating,
    createUser,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useCreateCandidate();
  const { register, handleSubmit, control } = Validation(username, fullName);
  return (
    <SecondaryComponents.MetaSetter
      title="Redeemer Teap International School, | Candidate"
      description="View all dashboard activities and statistics on Redeemer Teap International School,."
    >
      <LoaderHelper
        isLoading={false}
        classNames={globalStyles.pagePaddings}
        action="fetching Dashboard..."
      >
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-header">
              <h4 className="light-purple--text font-weight-bold">
                Create Candidate
              </h4>
            </div>

            <form onSubmit={handleSubmit(createUser)} className="login__form">
              {errorMessage && (
                <p className="error--squared mb-1">{errorMessage}</p>
              )}
              {message && <p className="success--squaredRadius">{message}</p>}
              <div className="form-group">
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Username"
                      placeholder="student001"
                      name="username"
                      className="white"
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setUsername(value);
                      }}
                      register={register}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Full Name"
                      placeholder="John Doe"
                      name="fullName"
                      className="white"
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setFullName(value);
                      }}
                      register={register}
                    />
                  )}
                />
              </div>

              <div className="mb-1"></div>

              <PrimaryComponents.Button
                classNames="btn btn--primary cover"
                type="submit"
                isDisabled={isCreating}
                isLoading={isCreating}
                loadingText="Signing Up..."
              >
                Create User
              </PrimaryComponents.Button>
            </form>
          </div>
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  );
};

export default CreateCandidate;
