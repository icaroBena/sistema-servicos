import { useState, useRef } from "react";
import React from "react";
import "../styles/confirm.css";

interface ConfirmOptions {
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

interface Props {
    visible: boolean;
    options: ConfirmOptions | null;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmDialog: React.FC<Props> = ({
    visible,
    options,
    onConfirm,
    onCancel
}) => {
    if (!visible || !options) return null;

    return (
        <div className="confirm-backdrop">
            <div className="confirm-modal" role="dialog" aria-modal="true">
                <h3>{options.title}</h3>
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

export const useConfirm = () => {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState<ConfirmOptions | null>(null);

    const resolverRef = useRef<(value: boolean) => void>();

    const show = (opts: ConfirmOptions): Promise<boolean> => {
        setOptions(opts);
        setVisible(true);

        return new Promise(resolve => {
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