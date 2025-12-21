import { render, cleanup } from "@testing-library/react";
import Button from "../Button";
import renderer from "react-test-renderer";

afterEach(cleanup);
it("renders without crashng", () => {
  const div = document.createElement("div");
  render(<Button></Button>, div);
});

it("renders button correctly", () => {
  const { getByTestId } = render(
    <Button classNames="btn btn--primary">Click me</Button>,
  );
  expect(getByTestId("button")).toHaveTextContent("Click me");
  expect(getByTestId("button")).toHaveClass("btn");
  expect(getByTestId("button")).toHaveClass("btn--primary");
});

it("renders button loading state correctly", () => {
  const { getByTestId } = render(
    <Button
      classNames="btn btn--primary"
      isLoading={true}
      loadingText="Loading..."
    >
      Click me
    </Button>,
  );
  expect(getByTestId("button")).toHaveTextContent("Loading...");
});

it("matches snapshot", () => {
  const tree = renderer
    .create(<Button classNames="btn btn--primary">Click me</Button>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
