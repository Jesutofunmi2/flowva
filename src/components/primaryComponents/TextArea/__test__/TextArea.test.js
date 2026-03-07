import { render, cleanup } from "@testing-library/react";
import TextArea from "../TextArea";
import renderer from "react-test-renderer";

afterEach(cleanup);
it("renders without crashng", () => {
  const div = document.createElement("div");
  render(<TextArea />, div);
});

it("renders textarea input field correctly", () => {
  const { getByTestId } = render(
    <TextArea label="Description" classNames="textarea" />,
  );
  expect(getByTestId("label")).toHaveTextContent("Description");
  expect(getByTestId("input")).toHaveClass("textarea");
});

it("handles error message correctly", () => {
  const { getByTestId } = render(
    <TextArea errorMessage={{ message: "This field is required" }} />,
  );
  expect(getByTestId("error-message")).toHaveTextContent(
    "This field is required",
  );
});

it("matches snapshot", () => {
  const tree = renderer.create(<TextArea label="Description" />).toJSON();
  expect(tree).toMatchSnapshot();
});
