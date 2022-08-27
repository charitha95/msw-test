import "@testing-library/jest-dom";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Home from "../pages/index";

const server = setupServer(
  rest.get("/api/colors", (req, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.json([
        {
          color: "red",
          value: "#f00",
        },
        {
          color: "green",
          value: "#0f0",
        },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("Home", () => {
  render(<Home />);
  it("renders list of colors", async () => {
    await waitForElementToBeRemoved(screen.getByText("loading..."));

    const colors = screen.getByTestId("color-list");
    expect(colors).toBeInTheDocument();
    expect(screen.getByText("BMW")).toBeInTheDocument();
  }, 1500);
});
