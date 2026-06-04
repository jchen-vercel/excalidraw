import { randomId, KEYS } from "@excalidraw/common";
import { useExcalidrawSetAppState } from "@excalidraw/excalidraw/components/App";
import {
  checkIcon,
  DotsIcon,
  TrashIcon,
} from "@excalidraw/excalidraw/components/icons";
import { useUIAppState } from "@excalidraw/excalidraw/context/ui-appState";
import { t } from "@excalidraw/excalidraw/i18n";

import type { ExcalidrawTodo } from "@excalidraw/excalidraw/types";

import { useCallback, useState } from "react";

import "./AppSidebar.scss";

export const TODOS_SIDEBAR_TAB = "todos";

const formatTimestamp = (timestamp: number) =>
  new Date(timestamp).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const reorderSection = (
  section: readonly ExcalidrawTodo[],
  sourceId: string,
  targetId: string,
): ExcalidrawTodo[] => {
  const fromIndex = section.findIndex((todo) => todo.id === sourceId);
  const toIndex = section.findIndex((todo) => todo.id === targetId);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
    return [...section];
  }
  const next = [...section];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};

const TodoListSection = ({
  title,
  todos,
  emptyLabel,
  onToggle,
  onDelete,
  onReorder,
}: {
  title: string;
  todos: readonly ExcalidrawTodo[];
  emptyLabel: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (sourceId: string, targetId: string) => void;
}) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  return (
    <section className="todo-sidebar__section">
      <h3 className="todo-sidebar__section-title">{title}</h3>
      {todos.length === 0 ? (
        <p className="todo-sidebar__empty">{emptyLabel}</p>
      ) : (
        <ul className="todo-sidebar__list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-sidebar__item${
                draggingId === todo.id ? " todo-sidebar__item--dragging" : ""
              }`}
              draggable
              onDragStart={() => setDraggingId(todo.id)}
              onDragEnd={() => setDraggingId(null)}
              onDragOver={(event) => {
                event.preventDefault();
              }}
              onDrop={(event) => {
                event.preventDefault();
                if (draggingId && draggingId !== todo.id) {
                  onReorder(draggingId, todo.id);
                }
                setDraggingId(null);
              }}
              data-testid={`todo-item-${todo.id}`}
            >
              <button
                type="button"
                className="todo-sidebar__drag-handle"
                aria-hidden
                tabIndex={-1}
              >
                {DotsIcon}
              </button>
              <button
                type="button"
                className={`todo-sidebar__checkbox${
                  todo.completed ? " todo-sidebar__checkbox--checked" : ""
                }`}
                role="checkbox"
                aria-checked={todo.completed}
                onClick={() => onToggle(todo.id)}
                data-testid={`todo-toggle-${todo.id}`}
              >
                {todo.completed ? checkIcon : null}
              </button>
              <div className="todo-sidebar__item-body">
                <span
                  className={`todo-sidebar__title${
                    todo.completed ? " todo-sidebar__title--completed" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <span className="todo-sidebar__meta">
                  {todo.completed && todo.completedAt
                    ? `${t("todos.completedAt")}: ${formatTimestamp(todo.completedAt)}`
                    : `${t("todos.created")}: ${formatTimestamp(todo.createdAt)}`}
                </span>
              </div>
              <button
                type="button"
                className="todo-sidebar__delete"
                aria-label={t("todos.delete")}
                onClick={() => onDelete(todo.id)}
                data-testid={`todo-delete-${todo.id}`}
              >
                {TrashIcon}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export const TodoSidebar = () => {
  const { todos } = useUIAppState();
  const setAppState = useExcalidrawSetAppState();
  const [draftTitle, setDraftTitle] = useState("");

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const setTodos = useCallback(
    (nextTodos: readonly ExcalidrawTodo[]) => {
      setAppState({ todos: nextTodos });
    },
    [setAppState],
  );

  const addTodo = useCallback(
    (title: string) => {
      const trimmed = title.trim();
      if (!trimmed) {
        return;
      }
      const now = Date.now();
      setTodos([
        ...todos,
        {
          id: randomId(),
          title: trimmed,
          completed: false,
          createdAt: now,
          completedAt: null,
        },
      ]);
      setDraftTitle("");
    },
    [setTodos, todos],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      const now = Date.now();
      setTodos(
        todos.map((todo) => {
          if (todo.id !== id) {
            return todo;
          }
          if (todo.completed) {
            return {
              ...todo,
              completed: false,
              completedAt: null,
            };
          }
          return {
            ...todo,
            completed: true,
            completedAt: now,
          };
        }),
      );
    },
    [setTodos, todos],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [setTodos, todos],
  );

  const reorderActive = useCallback(
    (sourceId: string, targetId: string) => {
      const reordered = reorderSection(activeTodos, sourceId, targetId);
      setTodos([...reordered, ...completedTodos]);
    },
    [activeTodos, completedTodos, setTodos],
  );

  const reorderCompleted = useCallback(
    (sourceId: string, targetId: string) => {
      const reordered = reorderSection(completedTodos, sourceId, targetId);
      setTodos([...activeTodos, ...reordered]);
    },
    [activeTodos, completedTodos, setTodos],
  );

  return (
    <div className="todo-sidebar" data-testid="todo-sidebar">
      <form
        className="todo-sidebar__composer"
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(draftTitle);
        }}
      >
        <input
          type="text"
          className="todo-sidebar__input"
          placeholder={t("todos.addPlaceholder")}
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === KEYS.ENTER) {
              event.preventDefault();
              addTodo(draftTitle);
            }
          }}
          data-testid="todo-input"
        />
      </form>
      <TodoListSection
        title={t("todos.active")}
        todos={activeTodos}
        emptyLabel={t("todos.emptyActive")}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onReorder={reorderActive}
      />
      <TodoListSection
        title={t("todos.completed")}
        todos={completedTodos}
        emptyLabel={t("todos.emptyCompleted")}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onReorder={reorderCompleted}
      />
    </div>
  );
};
