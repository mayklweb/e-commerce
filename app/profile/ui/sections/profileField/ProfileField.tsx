import { ProfileFieldProps } from "@/app/profile/model/types/types";
import { CheckIcon, EditIcon } from "@/app/shared/icons";

export function ProfileField({
  label,
  value,
  editing,
  disabled = false,
  saving,
  onChange,
  onToggle,
  onSave,
  onCancel,
  inputRef,
}: ProfileFieldProps) {
  return (
    <div>
      <label>{label}</label>
      <div className="w-full px-4 py-3 mt-1 flex items-center bg-gray rounded-xl gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          disabled={!editing || disabled}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSave?.();
            if (e.key === "Escape") onCancel?.();
          }}
          className="text-gray-600 flex-auto outline-none disabled:bg-transparent focus:text-black"
        />

        {!disabled && (
          editing ? (
            <button
              type="button"
              onClick={onSave}
              disabled={saving || !value}
              className="cursor-pointer disabled:opacity-40"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin inline-block" />
              ) : (
                <CheckIcon className="w-5 h-5 text-primary" />
              )}
            </button>
          ) : (
            <button type="button" onClick={onToggle} className="cursor-pointer">
              <EditIcon className="w-5 h-5 text-gray-600" />
            </button>
          )
        )}
      </div>
    </div>
  );
}