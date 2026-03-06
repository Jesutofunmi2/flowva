import { render, cleanup } from "@testing-library/react";
import DateInput from "../DateInput";
import renderer from "react-test-renderer";

afterEach(cleanup);
it("renders without crashng", () => {
  const div = document.createElement("div");
  render(<DateInput />, div);
});

it("renders input field correctly", () => {
  const { getByTestId } = render(<DateInput label="Date" classNames="date" />);
  expect(getByTestId("label")).toHaveTextContent("Date");
  expect(getByTestId("input")).toHaveClass("date");
});

it("handles error message correctly", () => {
  const { getByTestId } = render(
    <DateInput errorMessage={{ message: "This field is required" }} />,
  );
  expect(getByTestId("error-message")).toHaveTextContent(
    "This field is required",
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(<DateInput label="Date" classNames="date" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
