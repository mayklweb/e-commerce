interface UserInfoCardProps {
  name: string;
  phone?: string;
  className?: string;
}

export function UserInfoCard({ name, phone, className = "" }: UserInfoCardProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <span className="text-primary font-bold text-sm">
          {name?.charAt(0)?.toUpperCase() ?? "U"}
        </span>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-gray-800 truncate">
          {name}
        </span>
        <span className="text-xs text-gray-400 truncate">{phone ?? ""}</span>
      </div>
    </div>
  );
}