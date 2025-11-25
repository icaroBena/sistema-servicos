import React, { useState, useRef } from "react";
import "../styles/confirm.css";

/* -------------------------------------------------------
   TIPAGENS
------------------------------------------------------- */
interface ConfirmOptions {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ConfirmDialogProps {
  visible: boolean;
  options: ConfirmOptions | null;
  onConfirm: () => void;
  onCancel: () => void;
}

/* -------------------------------------------------------
   COMPONENTE: CONFIRM DIALOG
------------------------------------------------------- */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  visible,
  options,
  onConfirm,
  onCancel,
}) => {
  if (!visible || !options) return null;

  return (
    <div className="confirm-backdrop" role="presentation">
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <h3 id="confirm-title">{options.title}</h3>
        <p>{options.message}</p>

        <div className="confirm-buttons">
          <button className="btn danger" onClick={onConfirm}>
            {options.confirmLabel ?? "Confirmar"}
          </button>

          <button className="btn" onClick={onCancel}>
            {options.cancelLabel ?? "Cancelar"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------
   HOOK: useConfirm()
------------------------------------------------------- */
export const useConfirm = () => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const resolverRef = useRef<(value: boolean) => void>();

  const show = (opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setVisible(true);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleConfirm = () => {
    setVisible(false);
    resolverRef.current?.(true);
  };

  const handleCancel = () => {
    setVisible(false);
    resolverRef.current?.(false);
  };

  const Dialog = (
    <ConfirmDialog
      visible={visible}
      options={options}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { show, Dialog };
};
