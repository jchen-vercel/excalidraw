import React from "react";

import { resolvablePromise } from "@excalidraw/common";

import { Excalidraw } from "../index";

import { KEYS } from "@excalidraw/common";

import { getToolbarTools } from "../components/shapes";

import { API } from "./helpers/api";
import { Keyboard, Pointer } from "./helpers/ui";
import { act, render } from "./test-utils";

import type { AppClassProperties, ExcalidrawImperativeAPI } from "../types";

describe("setActiveTool()", () => {
  const h = window.h;

  let excalidrawAPI: ExcalidrawImperativeAPI;

  const mouse = new Pointer("mouse");

  beforeEach(async () => {
    const excalidrawAPIPromise = resolvablePromise<ExcalidrawImperativeAPI>();
    await render(
      <Excalidraw
        onExcalidrawAPI={(api) => excalidrawAPIPromise.resolve(api as any)}
      />,
    );
    excalidrawAPI = await excalidrawAPIPromise;
  });

  it("should expose setActiveTool on package API", () => {
    expect(excalidrawAPI.setActiveTool).toBeDefined();
    expect(excalidrawAPI.setActiveTool).toBe(h.app.setActiveTool);
  });

  it("should set the active tool type", async () => {
    expect(h.state.activeTool.type).toBe("selection");
    act(() => {
      excalidrawAPI.setActiveTool({ type: "rectangle" });
    });
    expect(h.state.activeTool.type).toBe("rectangle");

    mouse.down(10, 10);
    mouse.up(20, 20);

    expect(h.state.activeTool.type).toBe("selection");
  });

  it("should support tool locking", async () => {
    expect(h.state.activeTool.type).toBe("selection");
    act(() => {
      excalidrawAPI.setActiveTool({ type: "rectangle", locked: true });
    });
    expect(h.state.activeTool.type).toBe("rectangle");

    mouse.down(10, 10);
    mouse.up(20, 20);

    expect(h.state.activeTool.type).toBe("rectangle");
  });

  it("should set custom tool", async () => {
    expect(h.state.activeTool.type).toBe("selection");
    act(() => {
      excalidrawAPI.setActiveTool({ type: "custom", customType: "comment" });
    });
    expect(h.state.activeTool.type).toBe("custom");
    expect(h.state.activeTool.customType).toBe("comment");
  });
});
describe("sticky note tool", () => {
  const h = window.h;

  let excalidrawAPI: ExcalidrawImperativeAPI;

  beforeEach(async () => {
    const excalidrawAPIPromise = resolvablePromise<ExcalidrawImperativeAPI>();
    await render(
      <Excalidraw
        handleKeyboardGlobally
        onExcalidrawAPI={(api) => excalidrawAPIPromise.resolve(api as any)}
      />,
    );
    excalidrawAPI = await excalidrawAPIPromise;
  });

  it("should activate via keyboard shortcut N", async () => {
    expect(h.state.activeTool.type).toBe("selection");
    Keyboard.keyPress(KEYS.N);
    expect(h.state.activeTool.type).toBe("stickyNote");
  });

  it("should create sticky note elements without auto text", async () => {
    act(() => {
      excalidrawAPI.setActiveTool({ type: "stickyNote" });
    });
    const mouse = new Pointer("mouse");
    mouse.down(10, 10);
    mouse.up(110, 90);
    expect(h.elements).toHaveLength(1);
    expect(h.elements[0].type).toBe("stickyNote");
    expect(h.elements.some((el) => el.type === "text")).toBe(false);
  });

  it("should support bound text on sticky notes", async () => {
    const stickyNote = API.createElement({
      type: "stickyNote",
      width: 120,
      height: 160,
    });
    const text = API.createElement({
      type: "text",
      text: "sticky text",
      containerId: stickyNote.id,
      width: 80,
      height: 20,
    });
    act(() => {
      h.app.scene.insertElement(stickyNote);
      h.app.scene.insertElement(text);
      h.app.scene.mutateElement(stickyNote, {
        boundElements: [{ type: "text", id: text.id }],
      });
    });
    expect(text.containerId).toBe(stickyNote.id);
    expect(stickyNote.boundElements).toEqual([{ type: "text", id: text.id }]);
  });
});

describe("getToolbarTools()", () => {
  const getToolValues = (preferredSelectionTool: "selection" | "lasso") =>
    getToolbarTools({
      state: {
        preferredSelectionTool: {
          type: preferredSelectionTool,
        },
      },
    } as AppClassProperties).map((tool) => tool.value);

  it("does not include lasso when selection is preferred", () => {
    const toolValues = getToolValues("selection");

    expect(toolValues.filter((value) => value === "selection")).toHaveLength(1);
    expect(toolValues.filter((value) => value === "lasso")).toHaveLength(0);
    expect(toolValues).toContain("stickyNote");
  });

  it("replaces selection with lasso when lasso is preferred", () => {
    const toolValues = getToolValues("lasso");

    expect(toolValues.filter((value) => value === "lasso")).toHaveLength(1);
    expect(toolValues.filter((value) => value === "selection")).toHaveLength(0);
  });
});
