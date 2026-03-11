"use client";

import { LeftArrowIcon } from "../../../shared/icons";

interface BottomSheetProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// const EASING = "cubic-bezier(0.32, 0.72, 0, 1)";
const EASING = "ease";

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export function BottomSheet({
  title,
  open,
  onClose,
  children,
}: BottomSheetProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 40,
          opacity: open ? 1 : 0,
          transition: `opacity 0.38s ${EASING}`,
          pointerEvents: open ? "auto" : "none",
          backdropFilter: open ? "blur(5px)" : "blur(0px)",
          WebkitBackdropFilter: open ? "blur(5px)" : "blur(0px)",
        }}
      />

      {/* Sheet */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          background: "#fff",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.15)",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: `transform 0.38s ${EASING}`,
          maxHeight: "95svh",
          height: "100%",
          overflowY: "auto",
        }}
        className="rounded-t-xl"
      >
        {/* Handle + header */}
        <div
          style={{
            width: "100%",
            padding: "10px 0px",
            position: "sticky",
            top: 0,
            background: "#fff",
            zIndex: 1,
          }}
          className="border-b border-gray"
        >
          {/* Title row */}

          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  width: 26,
                  height: 26,
                  cursor: "pointer",
                }}
              >
                <LeftArrowIcon className="w-7 h-7" />
              </button>
              <span
                style={{ fontSize: 24, fontWeight: 500, color: "#1c1c1e" }}
                className="text-center"
              >
                {title}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container h-[calc(100%-64px)]">
          <div className="w-full h-full mt-4">{children}</div>
        </div>
      </div>
    </>
  );
}
