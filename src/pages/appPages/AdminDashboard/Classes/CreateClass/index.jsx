import React from "react";
import SecondaryComponents from "../../../../../components/secondaryComponents";
import useCreateClass from "./useCreateClass";
import Validation from "./Validation";
import { Controller } from "react-hook-form";
import PrimaryComponents from "../../../../../components/primaryComponents";

const CreateClass = () => {
  const {
    message,
    errorMessage,
    isCreating,
    name,
    createClass,
    setName,
  } = useCreateClass();
  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = Validation(name);

  return (
    <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Create Class"
      description="View all dashboard activities and statistics on Test Engine / Assessment Platform Solution,."
    >
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-header">
              <h4 className="light-purple--text font-weight-bold">
                Create Class
              </h4>
            </div>

            <form onSubmit={handleSubmit(createClass)} className="login__form">
              {errorMessage && (
                <p className="error--squared mb-1">{errorMessage}</p>
              )}
              {message && <p className="success--squaredRadius">{message}</p>}
              <div className="form-group">
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Classname"
                      placeholder="e.g JSS1"
                      name="name"
                      className="white"
                      errorMessage={errors.name}
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setName(value);
                      }}
                      onKeyUp={() =>
                        errors.name !== undefined && trigger("name")
                      }
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
                loadingText="Creating Class..."
              >
                Create
              </PrimaryComponents.Button>
            </form>
          </div>
        </div>
    </SecondaryComponents.MetaSetter>
  );
};

export default CreateClass;
