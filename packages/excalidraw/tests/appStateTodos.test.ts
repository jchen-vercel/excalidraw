import { THEME } from "@excalidraw/common";
import { describe, expect, it } from "vitest";

import {
  cleanAppStateForExport,
  clearAppStateForDatabase,
  clearAppStateForLocalStorage,
  getDefaultAppState,
} from "../appState";

import type { ExcalidrawTodo } from "../types";

const sampleTodos: ExcalidrawTodo[] = [
  {
    id: "todo-1",
    title: "Ship MVP",
    completed: false,
    createdAt: 1_700_000_000_000,
    completedAt: null,
  },
  {
    id: "todo-2",
    title: "Done item",
    completed: true,
    createdAt: 1_700_000_000_100,
    completedAt: 1_700_000_000_200,
  },
];

describe("todos app state persistence", () => {
  it("preserves todos in local storage export", () => {
    const appState = {
      ...getDefaultAppState(),
      todos: sampleTodos,
      theme: THEME.DARK,
    };

    expect(clearAppStateForLocalStorage(appState).todos).toEqual(sampleTodos);
  });

  it("preserves todos in file export", () => {
    const appState = {
      ...getDefaultAppState(),
      todos: sampleTodos,
      theme: THEME.DARK,
    };

    expect(cleanAppStateForExport(appState).todos).toEqual(sampleTodos);
  });

  it("preserves todos in database export", () => {
    const appState = {
      ...getDefaultAppState(),
      todos: sampleTodos,
      theme: THEME.DARK,
    };

    expect(clearAppStateForDatabase(appState).todos).toEqual(sampleTodos);
  });
});
