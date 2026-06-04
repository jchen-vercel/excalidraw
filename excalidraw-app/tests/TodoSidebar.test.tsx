import { DEFAULT_SIDEBAR } from "@excalidraw/common";
import {
  act,
  fireEvent,
  screen,
  waitFor,
  render,
} from "@excalidraw/excalidraw/tests/test-utils";

import ExcalidrawApp from "../App";
import { TODOS_SIDEBAR_TAB } from "../components/TodoSidebar";

describe("TodoSidebar", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("supports create, complete, reopen, and delete flows", async () => {
    await render(<ExcalidrawApp />, {
      localStorageData: {
        elements: [],
        appState: {
          openSidebar: { name: DEFAULT_SIDEBAR.name, tab: TODOS_SIDEBAR_TAB },
          todos: [],
        },
      },
    });

    await waitFor(() => {
      expect(screen.getByTestId("todo-sidebar")).toBeTruthy();
    });

    const input = screen.getByTestId("todo-input") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "First todo" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("First todo")).toBeTruthy();
    });

    fireEvent.click(screen.getByTestId(/^todo-toggle-/));

    await waitFor(() => {
      expect(screen.getByText(/Completed:/)).toBeTruthy();
    });

    fireEvent.click(screen.getByTestId(/^todo-toggle-/));

    await waitFor(() => {
      expect(screen.getByText("First todo")).toBeTruthy();
      expect(screen.queryByText(/Completed:/)).toBeNull();
      expect(
        screen.getByRole("heading", { name: "Active" }),
      ).toBeTruthy();
    });

    const deleteButton = screen.getByTestId(/^todo-delete-/);
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText("First todo")).toBeNull();
    });
  });

  it("persists todos to local storage on change", async () => {
    await render(<ExcalidrawApp />);

    await waitFor(() => expect(window.h?.app).toBeTruthy());

    act(() => {
      window.h.app.toggleSidebar({
        name: DEFAULT_SIDEBAR.name,
        tab: TODOS_SIDEBAR_TAB,
      });
      window.h.app.updateScene({
        appState: {
          todos: [
            {
              id: "persisted-todo",
              title: "Saved locally",
              completed: false,
              createdAt: Date.now(),
              completedAt: null,
            },
          ],
        },
      });
    });

    await waitFor(() => {
      const savedState = JSON.parse(
        localStorage.getItem("excalidraw-state") || "{}",
      );
      expect(savedState.todos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: "persisted-todo", title: "Saved locally" }),
        ]),
      );
    });
  });
});
