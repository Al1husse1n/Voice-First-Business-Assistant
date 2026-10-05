"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const CELL_SIZE = 92;
const REPEL_DISTANCE = 140;
const MAX_DISPLACEMENT = 25;
const PULSE_RADIUS = 150;

interface SignalCell {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

function createCells(width: number, height: number): SignalCell[] {
  const columns = Math.ceil(width / CELL_SIZE) + 1;
  const rows = Math.ceil(height / CELL_SIZE) + 1;
  return Array.from({ length: columns * rows }, (_, id) => {
    const column = id % columns;
    const row = Math.floor(id / columns);
    return {
      id,
      x: column * CELL_SIZE + (row % 2 ? 22 : 0),
      y: row * CELL_SIZE + 18,
      size: 28 + ((id * 7) % 9),
      opacity: 0.18 + ((id * 13) % 10) / 100,
    };
  });
}

export function SignalField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [pulse, setPulse] = useState<{ x: number; y: number; key: number } | null>(null);

  const cells = useMemo(
    () => createCells(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height],
  );

  useEffect(() => {
    const updateSize = () => {
      setDimensions({ width: window.innerWidth, height: Math.max(window.innerHeight, 620) });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;
    let frame = 0;
    let pointer: { x: number; y: number } | null = null;

    const updateTransforms = () => {
      frame = 0;
      cellRefs.current.forEach((cell, index) => {
        if (!cell) return;
        const item = cells[index];
        if (!pointer) {
          cell.style.setProperty("--signal-x", "0px");
          cell.style.setProperty("--signal-y", "0px");
          return;
        }
        const dx = item.x - pointer.x;
        const dy = item.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance >= REPEL_DISTANCE || distance === 0) {
          cell.style.setProperty("--signal-x", "0px");
          cell.style.setProperty("--signal-y", "0px");
          return;
        }
        const strength = (1 - distance / REPEL_DISTANCE) * MAX_DISPLACEMENT;
        cell.style.setProperty("--signal-x", `${(dx / distance) * strength}px`);
        cell.style.setProperty("--signal-y", `${(dy / distance) * strength}px`);
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        clearPointer();
        return;
      }
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      if (!frame) frame = window.requestAnimationFrame(updateTransforms);
    };
    const clearPointer = () => {
      pointer = null;
      if (!frame) frame = window.requestAnimationFrame(updateTransforms);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", clearPointer);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", clearPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [cells]);

  function handleClick(event: MouseEvent) {
    if ((event.target as HTMLElement).closest("a, button, input, textarea, select")) return;
    const field = fieldRef.current;
    if (!field) return;
    const rect = field.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return;
    setPulse({ x: event.clientX - rect.left, y: event.clientY - rect.top, key: Date.now() });
    window.setTimeout(() => setPulse(null), 520);
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      className="signal-field pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="signal-field-mask absolute inset-0">
        {cells.map((cell, index) => {
          const distance = pulse ? Math.hypot(cell.x - pulse.x, cell.y - pulse.y) : 0;
          return (
            <span
              key={cell.id}
              ref={(element) => {
                cellRefs.current[index] = element;
              }}
              className={`signal-glyph absolute ${
                pulse && distance <= PULSE_RADIUS ? "signal-glyph-pulse" : ""
              }`}
              style={{
                left: cell.x,
                top: cell.y,
                width: cell.size,
                height: cell.size,
                opacity: cell.opacity,
                "--pulse-delay": `${Math.min(distance / 430, 0.28)}s`,
                "--signal-opacity": cell.opacity,
              } as React.CSSProperties}
            >
              <span className="signal-glyph-bar signal-glyph-bar-short" />
              <span className="signal-glyph-bar signal-glyph-bar-tall" />
              <span className="signal-glyph-bar signal-glyph-bar-medium" />
            </span>
          );
        })}
      </div>
    </div>
  );
}
