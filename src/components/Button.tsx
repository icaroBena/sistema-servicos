import React from "react";

type ButtonProps = {
  variant: "primary" | "ghost";
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ variant, children, onClick }: ButtonProps) {
  return (
    <button className={`wm-btn wm-btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
