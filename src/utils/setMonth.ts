function formatDate(date: Date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
}

export function setMonth(
  n: number,
  setInicio: (date: string) => void,
  setFinal: (date: string) => void,
) {
  const date = new Date();
  date.setMonth(date.getMonth() + n);

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  setInicio(formatDate(firstDay));
  setFinal(formatDate(lastDay));
}
