import { ReactNode } from "react";

export interface SummaryCardProps {
  label: string;
  display: string;
  colorClass: string;
  icon: ReactNode;
  iconBgClass?: string;
  sub?: string;
}

export default function SummaryCard({
  label,
  display,
  colorClass,
  icon,
  iconBgClass,
  sub,
}: SummaryCardProps) {
  return (
    <div className="box flex flex-col gap-2 flex-1 min-w-[180px]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            iconBgClass ?? "bg-gray-100 text-gray-600"
          }`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
      <p className={`text-2xl font-bold ${colorClass}`}>{display}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </div>
  );
}
