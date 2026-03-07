import React from 'react'
import { Controller } from "react-hook-form";
import PrimaryComponents from "../../../../../components/primaryComponents";
import SecondaryComponents from "../../../../../components/secondaryComponents";
import Validation from './Validation';
import useCreateSubject from './useCreateSubject';

const CreateSubject = () => {
    const {
        message,
        errorMessage,
        isCreating,
        name,
        createSubject,
        setName,
      } = useCreateSubject();
      const {
        control,
        handleSubmit,
        register,
        trigger,
        formState: { errors },
      } = Validation(name);
  return (
  <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution, | Create Subject"
      description="View all dashboard activities and statistics on Test Engine / Assessment Platform Solution,."
    >
        <div className="login-page">
          <div className="login-page__container">
            <div className="login-header">
              <h4 className="light-purple--text font-weight-bold">
                Create Subject
              </h4>
            </div>

            <form onSubmit={handleSubmit(createSubject)} className="login__form">
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
                      label="Subject Name"
                      placeholder="e.g Mathematics"
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
                loadingText="Creating Subject..."
              >
                Create
              </PrimaryComponents.Button>
            </form>
          </div>
        </div>
    </SecondaryComponents.MetaSetter>
  )
}

export default CreateSubject