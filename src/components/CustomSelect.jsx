import { useEffect, useRef, useState } from "react";
const normalize = (o) => (typeof o === "string" ? { value: o, label: o } : o);
export function CustomSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false),
    ref = useRef(null),
    items = options.map(normalize),
    selected = items.find((o) => o.value === value);
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (
        e.type === "pointerdown" &&
        ref.current &&
        !ref.current.contains(e.target)
      )
        setOpen(false);
    };
    addEventListener("pointerdown", h);
    addEventListener("keydown", h);
    return () => {
      removeEventListener("pointerdown", h);
      removeEventListener("keydown", h);
    };
  }, []);
  return (
    <div className="field custom-select" ref={ref}>
      <label>{label}</label>
      <button
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {selected?.label || "Select"}
        <span>⌄</span>
      </button>
      {open && (
        <div className="select-menu" role="listbox">
          {items.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              aria-selected={value === o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
