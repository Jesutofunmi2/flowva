import { render, cleanup } from "@testing-library/react";
import InputField from "../InputField";
import renderer from "react-test-renderer";

afterEach(cleanup);
it("renders without crashng", () => {
  const div = document.createElement("div");
  render(<InputField />, div);
});

it("renders input field correctly", () => {
  const { getByTestId } = render(
    <InputField label="email" classNames="email" />,
  );
  expect(getByTestId("label")).toHaveTextContent("email");
  expect(getByTestId("input")).toHaveClass("email");
});

it("handles error message correctly", () => {
  const { getByTestId } = render(
    <InputField errorMessage={{ message: "This field is required" }} />,
  );
  expect(getByTestId("error-message")).toHaveTextContent(
    "This field is required",
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(<InputField label="email" classNames="email" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
