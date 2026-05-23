import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reveals streamed text progressively so large network chunks still feel
 * like natural typing instead of appearing all at once.
 */
export const useSmoothStreamingText = () => {
  const [text, setText] = useState("");
  const targetRef = useRef("");
  const frameRef = useRef<number | null>(null);

  const stopAnimation = useCallback(() => {
    if (frameRef.current != null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const animate = useCallback(() => {
    frameRef.current = null;

    setText((visible) => {
      const target = targetRef.current;

      if (visible.length >= target.length) {
        return visible;
      }

      const backlog = target.length - visible.length;
      const step = Math.min(backlog, Math.max(1, Math.ceil(backlog / 5)));
      const next = target.slice(0, visible.length + step);

      if (next.length < target.length) {
        frameRef.current = requestAnimationFrame(animate);
      }

      return next;
    });
  }, []);

  const append = useCallback(
    (delta: string) => {
      if (!delta) {
        return;
      }

      targetRef.current += delta;

      if (frameRef.current == null) {
        frameRef.current = requestAnimationFrame(animate);
      }
    },
    [animate],
  );

  const reset = useCallback(() => {
    targetRef.current = "";
    stopAnimation();
    setText("");
  }, [stopAnimation]);

  const finish = useCallback(() => {
    stopAnimation();
    setText(targetRef.current);
  }, [stopAnimation]);

  useEffect(() => stopAnimation, [stopAnimation]);

  return { text, append, reset, finish };
};
