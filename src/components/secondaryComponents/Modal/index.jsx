import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

const Modal = ({ open, onClose, title, children, maxWidth = 380, ariaLabelledBy, className = "" }) => {
  const rootRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;
    const node = rootRef.current;
    const focusable = node?.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    if (first) first.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose?.();
      } else if (e.key === "Tab") {
        const elements = Array.from(focusable || []);
        if (elements.length === 0) {
          e.preventDefault();
          return;
        }
        const idx = elements.indexOf(document.activeElement);
        if (e.shiftKey && idx === 0) {
          elements[elements.length - 1].focus();
          e.preventDefault();
        } else if (!e.shiftKey && idx === elements.length - 1) {
          elements[0].focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal-portal" role="dialog" aria-modal="true" aria-labelledby={ariaLabelledBy}>
      <div className="modal-backdrop" onMouseDown={onClose} />
      <div className="modal-wrap" style={{ maxWidth }} ref={rootRef}>
        <div className={`modal-content ${className}`}>
          <button className="modal-close" type="button" aria-label="Close" onClick={onClose}>
            <span className="modal-close-icon" aria-hidden>✕</span>
          </button>

          <div className="modal-body">
            {title && <h2 id={ariaLabelledBy || "modal-title"} className="modal-title">{title}</h2>}
            <div className="modal-children">{children}</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;