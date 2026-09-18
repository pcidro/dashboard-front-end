import React from "react";

type DateInputProps = React.ComponentProps<"input"> & {
  label: string;
};

export default function DateInput({
  label,
  className = "",
  id,
  ...props
}: DateInputProps) {
  const inputId = id ?? label.toLowerCase().replaceAll(" ", "-");

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-semibold text-dark">
        {label}
      </label>

      <input
        id={inputId}
        type="date"
        className="w-full rounded-xl bg-background p-[var(--gap-s)] text-dark outline-none border border-light-blue transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        {...props}
      />
    </div>
  );
}
