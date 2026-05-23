import { KEYS } from "@excalidraw/common";
import { TTDStreamFetch } from "@excalidraw/excalidraw";
import { ArrowRightIcon, stop as StopIcon } from "@excalidraw/excalidraw/components/icons";
import { InlineIcon } from "@excalidraw/excalidraw/components/InlineIcon";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import "@excalidraw/excalidraw/components/TTDDialog/Chat/Chat.scss";

import "./AssistantSidebar.scss";
import { useSmoothStreamingText } from "./useSmoothStreamingText";

export const ASSISTANT_SIDEBAR_TAB = "assistant";

type AssistantMessage = {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  isGenerating?: boolean;
  error?: string;
};

const SUGGESTED_PROMPTS = [
  "What are the most useful keyboard shortcuts?",
  "How do I create flowcharts and connect shapes with arrows?",
  "What are Excalidraw best practices for large diagrams?",
];

const ASSISTANT_API_URL =
  import.meta.env.VITE_APP_ASSISTANT_API_URL || "/api/excalidraw-assistant";

const createMessageId = () =>
  `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const AssistantSidebar = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );
  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    text: streamingText,
    append: appendStreamingText,
    reset: resetStreamingText,
    finish: finishStreamingText,
  } = useSmoothStreamingText();

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages, streamingText]);

  const submitPrompt = useCallback(
    async (prompt: string) => {
      const trimmedPrompt = prompt.trim();

      if (!trimmedPrompt || isGenerating) {
        return;
      }

      const userMessage: AssistantMessage = {
        id: createMessageId(),
        type: "user",
        content: trimmedPrompt,
        timestamp: new Date(),
      };

      const assistantMessageId = createMessageId();
      const assistantMessage: AssistantMessage = {
        id: assistantMessageId,
        type: "assistant",
        content: "",
        timestamp: new Date(),
        isGenerating: true,
      };

      const nextMessages = [...messages, userMessage];
      setMessages([...nextMessages, assistantMessage]);
      setCurrentPrompt("");
      setIsGenerating(true);
      setStreamingMessageId(assistantMessageId);
      resetStreamingText();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const llmMessages = nextMessages.map(({ type, content }) => ({
        role: type,
        content,
      }));

      const result = await TTDStreamFetch({
        url: ASSISTANT_API_URL,
        messages: llmMessages,
        signal: controller.signal,
        extractRateLimits: false,
        onChunk: (chunk) => {
          appendStreamingText(chunk);
        },
      });

      abortControllerRef.current = null;
      finishStreamingText();

      const finalContent = result.generatedResponse ?? "";

      if (result.error) {
        if (result.error.message === "Request aborted") {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    isGenerating: false,
                    content: finalContent,
                    error:
                      finalContent.length > 0 ? undefined : "Response stopped.",
                  }
                : message,
            ),
          );
          setIsGenerating(false);
          setStreamingMessageId(null);
          return;
        }

        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  isGenerating: false,
                  error: result.error?.message || "Something went wrong.",
                  content:
                    finalContent ||
                    result.error?.message ||
                    "Something went wrong.",
                }
              : message,
          ),
        );
        setIsGenerating(false);
        setStreamingMessageId(null);
        return;
      }

      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                isGenerating: false,
                content: finalContent,
              }
            : message,
        ),
      );
      setIsGenerating(false);
      setStreamingMessageId(null);
    },
    [appendStreamingText, finishStreamingText, isGenerating, messages, resetStreamingText],
  );

  const handleSubmit = () => {
    if (isGenerating) {
      abortControllerRef.current?.abort();
      return;
    }

    void submitPrompt(currentPrompt);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === KEYS.ENTER && !event.shiftKey) {
      event.preventDefault();
      if (!isGenerating) {
        handleSubmit();
      }
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const canSend = currentPrompt.trim().length > 0 && !isGenerating;

  const getMessageContent = (message: AssistantMessage) => {
    if (message.id === streamingMessageId && isGenerating) {
      return streamingText;
    }

    return message.content;
  };

  return (
    <div className="assistant-sidebar">
      <div className="chat-interface">
        <div className="chat-interface__messages">
          {messages.length === 0 ? (
            <div className="chat-interface__welcome-screen">
              <div className="assistant-sidebar__welcome">
                <h3>Excalidraw Assistant</h3>
                <p>
                  Ask about keyboard shortcuts, tools, best practices, exports,
                  and collaboration.
                </p>
                <div className="assistant-sidebar__suggestions">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="assistant-sidebar__suggestion"
                      onClick={() => void submitPrompt(prompt)}
                      disabled={isGenerating}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const content = getMessageContent(message);
              const generating =
                message.isGenerating && message.id === streamingMessageId;

              return (
                <div
                  key={message.id}
                  className={`chat-message chat-message--${message.type}`}
                >
                  <div className="chat-message__content">
                    <div className="chat-message__header">
                      <span className="chat-message__role">
                        {message.type === "user" ? "You" : "Assistant"}
                      </span>
                      <span className="chat-message__timestamp">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="chat-message__body">
                      {message.error ? (
                        <div className="chat-message__error">{content}</div>
                      ) : (
                        <div className="chat-message__text">
                          {content}
                          {generating && (
                            <span className="chat-message__cursor">▋</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-interface__input-container">
          <div className="chat-interface__input-outer">
            <div
              className="chat-interface__input-wrapper"
              style={{
                borderColor: isGenerating
                  ? "var(--dialog-border-color)"
                  : undefined,
              }}
            >
              <textarea
                ref={textareaRef}
                autoFocus
                className="chat-interface__input"
                value={currentPrompt}
                onChange={(event) => setCurrentPrompt(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isGenerating
                    ? "Generating..."
                    : "Ask about Excalidraw… (Shift+Enter for newline)"
                }
                rows={1}
                onInput={(event) => {
                  const target = event.currentTarget;
                  target.style.height = "auto";
                  target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
                }}
              />
              <button
                className="chat-interface__send-button"
                onClick={handleSubmit}
                disabled={!canSend && !isGenerating}
                type="button"
                aria-label={isGenerating ? "Stop" : "Send"}
              >
                <InlineIcon
                  size="1.5em"
                  icon={isGenerating ? StopIcon : ArrowRightIcon}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
