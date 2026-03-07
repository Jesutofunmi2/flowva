import React from 'react'
import useUpdateClass from './useUpdateClass';
import Validation from './Validation';
import SecondaryComponents from "../../../../../components/secondaryComponents";
import { Controller } from "react-hook-form";
import PrimaryComponents from "../../../../../components/primaryComponents";

const UpdateClass = () => {
    const { updateClass, name, setName, errorMessage, message, loading } = useUpdateClass();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        trigger,
      } = Validation(name);
  return (
    <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Update Class"
      description="View all dashboard activities and statistics on Test Engine / Assessment Platform Solution,."
    >
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-header">
              <h4 className="light-purple--text font-weight-bold">
                Update Class
              </h4>
            </div>

            <form onSubmit={handleSubmit(updateClass)} className="login__form">
              {errorMessage && (
                <p className="error--squared mb-1">{errorMessage}</p>
              )}
              {message && <p className="success--squaredRadius">{message}</p>}
              <div className="form-group">
                <Controller
                  name="name"
                  control={control}
                  defaultValue={name}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Classname"
                      placeholder="e.g JSS1"
                      name="name"
                      className="white"
                      value={name}
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
                isDisabled={loading}
                isLoading={loading}
                loadingText="Updating Class..."
              >
                Update
              </PrimaryComponents.Button>
            </form>
          </div>
        </div>
    </SecondaryComponents.MetaSetter>
  )
}

export default UpdateClass