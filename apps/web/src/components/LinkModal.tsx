import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

type ModalMode = "create" | "edit" | "delete";

interface LinkModalProps {
  isOpen: boolean;
  mode: ModalMode;
  formData: { slug: string; url: string };
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFormDataChange?: (data: { slug: string; url: string }) => void;
}

export default function LinkModal({
  isOpen,
  mode,
  formData,
  isLoading = false,
  onClose,
  onSubmit,
  onFormDataChange,
}: LinkModalProps) {
  const slugInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && mode !== "delete") {
      if (mode === "edit") {
        urlInputRef.current?.focus();
      } else {
        slugInputRef.current?.focus();
      }
    }
  }, [isOpen, mode]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const isReadOnly = mode === "delete";
  const isSlugDisabled = mode === "edit" || mode === "delete";

  const titles: Record<ModalMode, string> = {
    create: "Crear Nuevo Link",
    edit: "Editar Link",
    delete: "¿Estás seguro de que deseas eliminar este link?",
  };

  const submitButtonText: Record<ModalMode, string> = {
    create: "Crear Link",
    edit: "Guardar Cambios",
    delete: "Eliminar Link",
  };

  const submitButtonClass =
    mode === "delete"
      ? "flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      : "flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          onClose();
        }
      }}
    >
      <div
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl p-6 transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-white">{titles[mode]}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Slug (Corto)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-700 bg-slate-800 text-slate-500 text-sm">
                /
              </span>
              <input
                type="text"
                required
                disabled={isSlugDisabled || isLoading}
                readOnly={isReadOnly}
                ref={slugInputRef}
                className={`flex-1 bg-slate-950 border border-slate-700 text-white text-sm rounded-r-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 ${isSlugDisabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                placeholder="mi-link"
                value={formData.slug}
                onChange={(e) =>
                  !isReadOnly &&
                  onFormDataChange?.({ ...formData, slug: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              URL Destino
            </label>
            <input
              type="url"
              required
              disabled={isReadOnly || isLoading}
              readOnly={isReadOnly}
              ref={urlInputRef}
              className="bg-slate-950 border border-slate-700 text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="https://google.com"
              value={formData.url}
              onChange={(e) =>
                !isReadOnly &&
                onFormDataChange?.({ ...formData, url: e.target.value })
              }
            />
          </div>

          <div className="flex gap-3 mt-6 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={submitButtonClass}
            >
              {isLoading && <Loader2 size={18} className="animate-spin" />}
              {submitButtonText[mode]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
