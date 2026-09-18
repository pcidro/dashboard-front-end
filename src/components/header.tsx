import DateRange from "./dateRange";
import Months from "./months";

export default function Header() {
  return (
    <header className="mb">
      <div className="mb">
        <DateRange />
        <Months />
      </div>
    </header>
  );
}
