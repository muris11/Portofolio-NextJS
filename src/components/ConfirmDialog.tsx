import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      // Focus trap - focus the cancel button initially
      const cancelButton = document.getElementById("confirm-cancel");
      if (cancelButton) cancelButton.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      icon: "text-black",
      button: "bg-red-500 hover:bg-red-400 text-black",
      border: "border-black",
      bg: "bg-red-100",
    },
    warning: {
      icon: "text-black",
      button: "bg-yellow-400 hover:bg-yellow-300 text-black",
      border: "border-black",
      bg: "bg-yellow-100",
    },
    info: {
      icon: "text-black",
      button: "bg-blue-400 hover:bg-blue-300 text-black",
      border: "border-black",
      bg: "bg-blue-100",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        className={`w-full max-w-md bg-white border-4 border-black shadow-neo-lg transform transition-all`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        {/* Header */}
        <div className={`p-6 ${styles.bg} border-b-4 border-black`}>
          <div className="flex items-center space-x-4">
            <div className={`p-3 border-2 border-black bg-white shadow-neo-sm`}>
              <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
            </div>
            <div className="flex-1">
              <h3
                id="confirm-title"
                className="text-xl font-black uppercase text-black"
              >
                {title}
              </h3>
            </div>
            <button
              onClick={onCancel}
              className="p-2 border-2 border-transparent hover:border-black hover:bg-white hover:shadow-neo transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Close dialog"
            >
              <X className="h-6 w-6 text-black" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p
            id="confirm-message"
            className="text-black font-medium text-lg leading-relaxed"
          >
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex space-x-4 justify-end">
          <button
            id="confirm-cancel"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 font-bold uppercase border-4 border-black bg-white hover:bg-gray-100 shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-6 py-3 font-bold uppercase border-4 border-black shadow-neo active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 ${styles.button}`}
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{confirmButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
