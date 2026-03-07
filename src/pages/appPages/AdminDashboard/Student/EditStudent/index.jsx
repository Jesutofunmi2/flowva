import Validation from "./Validation";
import SecondaryComponents from "../../../../../components/secondaryComponents";
import { Controller } from "react-hook-form";
import PrimaryComponents from "../../../../../components/primaryComponents";
import useEditStudent from "./useEditStudent";

const EditStudent = () => {
  const {
    username,
    message,
    fullName,
    errorMessage,
    isCreating,
    dateOfBirth,
    gender,
    session,
    classes,
    className,
    passportPreview,
    setClassName,
    setGender,
    updateUser,
    setDateOfBirth,
    setSession,
    setUsername,
    setFullName,
    handlePassportChange,
  } = useEditStudent();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = Validation(username, fullName, className, gender, dateOfBirth, session);
  return (
    <SecondaryComponents.MetaSetter
      title="Redeemer Teap International School, | Edit Student"
      description="View all dashboard activities and statistics on Redeemer Teap International School,."
    >
      <div
        className="login-page"
        style={{ padding: "30px 20px", maxWidth: "800px", margin: "0 auto" }}
      >
        <div className="login-page__container">
          <div className="login-header">
            <h4 className="light-purple--text font-weight-bold">
              Edit Student
            </h4>
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "100px",
            }}
            className="grid-2-col"
          >
            <div className="login__form">
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
                      value={username}
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setUsername(value);
                      }}
                      isDisabled
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
                      value={fullName}
                      errorMessage={errors.fullName}
                      onChange={({ target: { value } }) => {
                        onChange(value);
                        setFullName(value);
                      }}
                      onKeyUp={() =>
                        errors.fullName !== undefined && trigger("fullName")
                      }
                      register={register}

                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Controller
                  name="class"
                  control={control}
                  defaultValue={className}
                  rules={{ required: "Class is required" }}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.SelectField
                      label="Class"
                      placeholder={classes.find((cls) => cls.id === className)?.name}
                      classNames="account-select"
                      value={className}
                      options={
                        classes?.map((cls) => ({
                          name: cls.name,
                          id: cls.id,
                        })) || []
                      }
                      nameKey="name"
                      idKey="id"
                      onChange={(value) => {
                        onChange(value);
                        setClassName(value);
                      }}
                      errorMessage={errors.class}
                      giveControl= {false}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.SelectField
                      label="Gender"
                      placeholder={gender}
                      nameKey="name"
                      value={gender}
                      options={[
                        { name: "Male", id: "male" },
                        { name: "Female", id: "female" },
                        { name: "Other", id: "other" },
                      ]}
                      onChange={(value) => {
                        onChange(value);
                        setGender(value);
                      }}
                      idKey="id"
                      classNames="account-select"
                      errorMessage={errors.gender}
                      giveControl= {false}
                    />
                  )}
                />
              </div>
              <div className="mb-1">
                <PrimaryComponents.DateInputV2
                  name="dateOfBirth"
                  control={control}
                  label={`Date of Birth ${dateOfBirth}`}
                  placeholder="Select Date of Birth"
                  classNames="account-select"
                  register={register}
                  onChange={(e) => {
                    setDateOfBirth(e?.target?.value);
                  }}
                  errorMessage={errors.dateOfBirth}
                />
              </div>

              <div className="mb-1">
                <Controller
                  name="session"
                  control={control}
                  rules={{ required: "Session is required" }}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.SelectField
                      label="Session"
                      placeholder={session}
                      value={session}
                      options={[
                        { label: "2021/2022", value: "2021/2022" },
                        { label: "2022/2023", value: "2022/2023" },
                        { label: "2023/2024", value: "2023/2024" },
                        { label: "2024/2025", value: "2024/2025" },
                        { label: "2025/2026", value: "2025/2026" },
                      ]}
                      onChange={(value) => {
                        onChange(value);
                        setSession(value);
                      }}
                      nameKey="label"
                      idKey="value"
                      classNames="account-select"
                      errorMessage={errors.session}
                      giveControl= {false}
                    />
                  )}
                />
              </div>

              <PrimaryComponents.Button
                classNames="btn btn--primary cover"
                onClick={handleSubmit(updateUser)}
                type="submit"
                isDisabled={isCreating}
                isLoading={isCreating}
                loadingText="Updating..."
              >
                Update
              </PrimaryComponents.Button>
            </div>
            <div className="mb-2">
              <h6 className="form-label">Student Passport</h6>

              <PrimaryComponents.InputField
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => handlePassportChange(e.target.files[0])}
              />

              {passportPreview && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    src={passportPreview}
                    alt="passport preview"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SecondaryComponents.MetaSetter>
  );
};

export default EditStudent;
