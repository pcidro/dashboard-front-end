import MonthBtn from "./monthBtn";

export default function Months() {
  return (
    <div className="flex justify-center items-center gap-[var(--gap-s)] mt-[var(--gap-s)] flex-wrap">
      <MonthBtn n={-3} />
      <MonthBtn n={-2} />
      <MonthBtn n={-1} />
      <MonthBtn n={0} />
    </div>
  );
}
