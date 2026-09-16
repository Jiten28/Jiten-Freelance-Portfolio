import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

const normalize = (option) =>
  typeof option === "string" ? { value: option, label: option } : option;

export function CustomSelect({ label, value, onChange, options }) {
  const [open, setOpen] = useState(false),
    [dropUp, setDropUp] = useState(false),
    [menuHeight, setMenuHeight] = useState(360),
    [activeIndex, setActiveIndex] = useState(-1),
    ref = useRef(null),
    triggerRef = useRef(null),
    optionRefs = useRef([]),
    labelId = useId(),
    listboxId = useId(),
    items = options.map(normalize),
    selected = items.find((option) => option.value === value);

  function positionMenu() {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect(),
      desired = Math.min(360, items.length * 48 + 12),
      below = window.innerHeight - rect.bottom - 12,
      above = rect.top - 12,
      upward = below < desired && above > below,
      available = Math.max(140, Math.min(desired, upward ? above : below));
    setDropUp(upward);
    setMenuHeight(available);
  }

  function openMenu(preferredIndex) {
    positionMenu();
    const selectedIndex = items.findIndex((option) => option.value === value),
      nextIndex = preferredIndex ?? (selectedIndex >= 0 ? selectedIndex : 0);
    setActiveIndex(nextIndex);
    setOpen(true);
  }

  function choose(index) {
    const option = items[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  useLayoutEffect(() => {
    if (!open) return;
    positionMenu();
    requestAnimationFrame(() => optionRefs.current[activeIndex]?.focus());
  }, [open, activeIndex]);

  useEffect(() => {
    const handleOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) setOpen(false);
      },
      handleViewport = () => open && positionMenu();
    addEventListener("pointerdown", handleOutside);
    addEventListener("resize", handleViewport);
    addEventListener("scroll", handleViewport, true);
    return () => {
      removeEventListener("pointerdown", handleOutside);
      removeEventListener("resize", handleViewport);
      removeEventListener("scroll", handleViewport, true);
    };
  }, [open]);

  function onTriggerKeyDown(event) {
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      openMenu(event.key === "ArrowUp" ? items.length - 1 : undefined);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  function onOptionKeyDown(event, index) {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const next =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? items.length - 1
            : (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) %
              items.length;
      setActiveIndex(next);
      optionRefs.current[next]?.focus();
    } else if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      choose(index);
    }
  }

  return (
    <div
      className={`field custom-select${open ? " open" : ""}${dropUp ? " drop-up" : ""}`}
      ref={ref}
    >
      <label id={labelId}>{label}</label>
      <button
        ref={triggerRef}
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        aria-controls={listboxId}
        onKeyDown={onTriggerKeyDown}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        {selected?.label || "Select"}
        <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div
          id={listboxId}
          className="select-menu"
          role="listbox"
          aria-labelledby={labelId}
          style={{ maxHeight: menuHeight }}
        >
          {items.map((option, index) => (
            <button
              ref={(node) => (optionRefs.current[index] = node)}
              key={option.value}
              type="button"
              role="option"
              tabIndex={index === activeIndex ? 0 : -1}
              aria-selected={value === option.value}
              onFocus={() => setActiveIndex(index)}
              onKeyDown={(event) => onOptionKeyDown(event, index)}
              onClick={() => choose(index)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
