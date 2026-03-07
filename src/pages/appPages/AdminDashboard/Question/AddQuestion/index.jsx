import SecondaryComponents from "../../../../../components/secondaryComponents";
import PrimaryComponents from "../../../../../components/primaryComponents";
import Validation from "./Validation";
import useAddQuestion from "./useAddQuestion";
import { Controller } from "react-hook-form";

const AddQuestion = () => {
  const {
    questionTitle,
    setQuestionTitle,
    AddQuestion,
    preview,
    handleImageChange,
    options,
    setOptions,
    correctIndex,
    setCorrectIndex,
    fileRefQuestion,
    handleOptionImageChange,
    classes,
    setSubjectId,
    subjectId,
    classId,
    setClassId,
    errorMessage,
    message,
    isCreating,
    subjects,
  } = useAddQuestion();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = Validation({ questionTitle, classId, subjectId });

  return (
    <SecondaryComponents.MetaSetter
      title="Test Engine / Assessment Platform Solution | Create Question"
      description="Create question"
    >
      <div
        className="login-page"
        style={{ padding: "30px 20px", maxWidth: "800px", margin: "0 auto" }}
      >
        <div className="login-page__container">
          <div className="login-header">
            <h4 className="light-purple--text font-weight-bold">
              Create Question
            </h4>
          </div>
        </div>

        <div className="login-page__form" style={{ marginTop: "40px" }}>
           {errorMessage && (
                <p className="error--squared mb-1">{errorMessage}</p>
              )}
              {message && <p className="success--squaredRadius">{message}</p>}
          <form
            onSubmit={handleSubmit(AddQuestion, (errors) => {
              console.log("Validation Errors:", errors);
            })}
            className="login__form"
          >
            {/* Question Title */}
            <PrimaryComponents.TextAreaV2
              control={control}
              label="Question Title"
              placeholder="Enter question title"
              name="questionTitle"
              value={questionTitle}
              className="white"
              onChange={({ target: { value } }) => {
                setQuestionTitle(value);
              }}
              onKeyUp={() =>
                errors.questionTitle !== undefined && trigger("questionTitle")
              }
              errorMessage={errors.questionTitle}
              register={register}
            />
            <div
              className="mb-1"
              style={{ display: "flex", alignItems: "center", gap: "20px" }}
            >
              <div style={{ width: "45%" }}>
                <Controller
                  name="classId"
                  control={control}
                  rules={{ required: "Class is required" }}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.SelectField
                      label="Class"
                      placeholder={"Select Class"}
                      classNames="account-select"
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
                        setClassId(value);
                      }}
                      errorMessage={errors.classId}
                    />
                  )}
                />
              </div>
              <div style={{ width: "45%" }}>
                <Controller
                  name="subjectId"
                  control={control}
                  rules={{ required: "Subject is required" }}
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.SelectField
                      label="Subject"
                      placeholder={"Select Subject"}
                      classNames="account-select"
                      options={
                        subjects?.map((cls) => ({
                          name: cls.name,
                          id: cls.id,
                        })) || []
                      }
                      nameKey="name"
                      idKey="id"
                      onChange={(value) => {
                        onChange(value);
                        setSubjectId(value);
                      }}
                      errorMessage={errors.subjectId}
                    />
                  )}
                />
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileRefQuestion}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleImageChange}
            />

            {/* Upload Button */}
            <PrimaryComponents.Button
              type="button"
              className="w-100 btn btn--primary smallBtn"
              style={{ marginTop: "20px" }}
              onClick={() => fileRefQuestion.current.click()}
            >
              Upload Question Image Optional
            </PrimaryComponents.Button>

            {/* Image Preview */}
            {preview && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <img
                  src={preview}
                  alt="Question Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "250px",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            <h5>Options</h5>

            {options.map((opt, index) => (
              <div key={index} style={{ marginTop: "20px" }}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange } }) => (
                    <PrimaryComponents.InputField
                      label={`Option ${index + 1}`}
                      placeholder={`Option ${index + 1}`}
                      value={opt.text}
                      onChange={({ target: { value } }) => {
                        const copy = [...options];
                        copy[index].text = value;
                        onChange(value);
                        setOptions(copy);
                      }}
                    />
                  )}
                />
                <div
                  style={{ display: "flex", alignItems: "center", gap: "70px" }}
                >
                  <input
                    type="file"
                    id={`optionFile${index}`}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => handleOptionImageChange(e, index)}
                  />

                  <PrimaryComponents.Button
                    type="button"
                    className="btn btn--primary smallBtn"
                    style={{ marginTop: "10px" }}
                    onClick={() =>
                      document.getElementById(`optionFile${index}`).click()
                    }
                  >
                    Upload Option Image Optional
                  </PrimaryComponents.Button>

                  <div style={{ marginTop: "10px" }}>
                    <input
                      type="radio"
                      name="correct"
                      checked={correctIndex === index}
                      onChange={() => setCorrectIndex(index)}
                    />
                    Correct
                  </div>
                </div>
                {opt.preview && (
                  <div style={{ marginTop: "10px" }}>
                    <img
                      src={opt.preview}
                      alt="Option Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "200px",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Submit */}
            <PrimaryComponents.Button
              type="submit"
              className="w-100 btn btn--primary cover"
              style={{ marginTop: "30px" }}
              isLoading={isCreating}
              loadingText={"Creating..."}
              isDisabled={isCreating}
            >
              Create Question
            </PrimaryComponents.Button>
          </form>
        </div>
      </div>
    </SecondaryComponents.MetaSetter>
  );
};

export default AddQuestion;
