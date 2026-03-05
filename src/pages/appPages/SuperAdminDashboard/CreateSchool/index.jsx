import LoaderHelper from "../../../../components/secondaryComponents/LoaderHelper";
import globalStyles from "../../../../assets/styles/base/globalPage.module.scss";
import Validation from "./Validation";
import SecondaryComponents from "../../../../components/secondaryComponents";
import { Controller } from "react-hook-form";
import PrimaryComponents from "../../../../components/primaryComponents";
import useCreateSchool from "./useCreateSchool";

const CreateSchool = () => {
    const {
    address,
    setAddress,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    message,
    name,
    errorMessage,
    isCreating,
    createSchool,
  } = useCreateSchool();
  const { register, handleSubmit, control, trigger } = Validation(address, name, email, phone);
  return (
   <SecondaryComponents.MetaSetter
      title="Redeemer Teap International School, | Create Candidate"
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
                Create School
              </h4>
            </div>

            <form onSubmit={handleSubmit(createSchool)} className="login__form">
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
                      label="Name"
                      placeholder="Redeemer Teap International School"
                      name="name"
                      className="white"
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setName(value);
                      }}
                      onKeyUp={() =>
                        errorMessage.name !== undefined && trigger("name")
                      }
                      register={register}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Email"
                      placeholder="example@example.com"
                      name="email"
                      className="white"
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setEmail(value);
                      }}
                      onKeyUp={() =>
                        errorMessage.email !== undefined && trigger("email")
                      }
                      register={register}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Address"
                      placeholder="123 Main St"
                      name="address"
                      className="white"
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setAddress(value);
                      }}
                      onKeyUp={() =>
                        errorMessage.address !== undefined && trigger("address")
                      }
                      register={register}
                    />
                  )}
                />
              </div>

              <div className="mb-1">
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label="Phone"
                      placeholder="123-456-7890"
                      name="phone"
                      className="white"
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setPhone(value);
                      }}
                      onKeyUp={() =>
                        errorMessage.phone !== undefined && trigger("phone")
                      }
                      register={register}
                    />
                  )}
                />
              </div>

              <PrimaryComponents.Button
                classNames="btn btn--primary cover"
                type="submit"
                isDisabled={isCreating}
                isLoading={isCreating}
                loadingText="Signing Up..."
              >
                Create
              </PrimaryComponents.Button>
            </form>
          </div>
        </div>
      </LoaderHelper>
    </SecondaryComponents.MetaSetter>
  )
}

export default CreateSchool