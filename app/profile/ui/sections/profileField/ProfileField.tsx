
import { ProfileFieldProps } from "@/app/profile/model/types/types";
import { EditIcon } from "@/app/shared/icons";

export function ProfileField({
  label,
  value,
  editing,
  disabled = false,
  onChange,
  onToggle,
  inputRef,
}: ProfileFieldProps) {
  return (
    <div>
      <label>{label}</label>
      <div className="w-full px-4 py-3 mt-1 flex items-center bg-gray rounded-xl">
        <input
          ref={inputRef}
          type="text"
          value={value}
          disabled={!editing || disabled}
          onChange={onChange}
          className="text-gray-600 flex-auto outline-none disabled:bg-transparent focus:text-black"
        />
        {!disabled && (
          <button type="button" onClick={onToggle} className="cursor-pointer">
            <EditIcon className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}