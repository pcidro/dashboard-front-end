export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-[var(--gap)]">
      <div className="flex flex-wrap gap-[var(--gap)]">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="box flex-1 min-w-[180px] h-24 animate-pulse bg-gray-100 rounded-[var(--gap)]"
          />
        ))}
      </div>
      <div className="box h-10 animate-pulse bg-gray-100 rounded-[var(--gap)]" />
      <div className="box h-40 animate-pulse bg-gray-100 rounded-[var(--gap)]" />
    </div>
  );
}
