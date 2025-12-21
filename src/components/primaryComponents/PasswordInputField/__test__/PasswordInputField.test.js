import { render, cleanup } from "@testing-library/react";
import PasswordInputField from "../PasswordInputField";
import renderer from "react-test-renderer";

afterEach(cleanup);
it("renders without crashng", () => {
  const div = document.createElement("div");
  render(<PasswordInputField />, div);
});

it("renders password input field correctly", () => {
  const { getByTestId } = render(<PasswordInputField label="password" />);
  expect(getByTestId("label")).toHaveTextContent("password");
});

it("handles error message correctly", () => {
  const { getByTestId } = render(
    <PasswordInputField errorMessage={{ message: "Invalid password" }} />,
  );
  expect(getByTestId("error-message")).toHaveTextContent("Invalid password");
});

it("matches snapshot", () => {
  const tree = renderer
    .create(<PasswordInputField label="password" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
