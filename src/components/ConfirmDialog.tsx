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
      icon: "text-red-500",
      button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      border: "border-red-200 dark:border-red-800",
      bg: "bg-red-50 dark:bg-red-900/20",
    },
    warning: {
      icon: "text-yellow-500",
      button: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
      border: "border-yellow-200 dark:border-yellow-800",
      bg: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    info: {
      icon: "text-blue-500",
      button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      border: "border-blue-200 dark:border-blue-800",
      bg: "bg-blue-50 dark:bg-blue-900/20",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        className={`w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl border ${styles.border} shadow-2xl transform transition-all`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        {/* Header */}
        <div className={`p-6 ${styles.bg} rounded-t-2xl`}>
          <div className="flex items-center space-x-4">
            <div
              className={`p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg`}
            >
              <AlertTriangle className={`h-6 w-6 ${styles.icon}`} />
            </div>
            <div className="flex-1">
              <h3
                id="confirm-title"
                className="text-lg font-semibold text-gray-900 dark:text-white"
              >
                {title}
              </h3>
            </div>
            <button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p
            id="confirm-message"
            className="text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex space-x-3 justify-end">
          <button
            id="confirm-cancel"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelButtonText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-white ${styles.button} rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2`}
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            <span>{confirmButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
