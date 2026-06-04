import { describe, expect, it } from "vitest";

import { restoreAppState } from "../../data/restore";

describe("restoreAppState todos", () => {
  it("sanitizes invalid todo payloads", () => {
    const restored = restoreAppState(
      {
        todos: [
          {
            id: "valid",
            title: "  Keep me  ",
            completed: true,
            createdAt: 100,
            completedAt: null,
          },
          { id: "bad", title: 123 },
          null,
        ] as any,
      },
      null,
    );

    expect(restored.todos).toEqual([
      {
        id: "valid",
        title: "Keep me",
        completed: true,
        createdAt: 100,
        completedAt: 100,
      },
    ]);
  });

  it("defaults to empty todos when missing", () => {
    expect(restoreAppState({}, null).todos).toEqual([]);
  });
});
