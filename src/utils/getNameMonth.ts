export function getNameMonth(n: number) {
  const date = new Date();
  date.setMonth(date.getMonth() + n);
  const nome = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
  }).format(date);
  return nome;
}
