const MONTHS_SHORT = ["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek"];
const MONTHS_LONG = [
  "yanvar", "fevral", "mart", "aprel", "may", "iyun",
  "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
];
const WEEKDAYS = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];

const pad = (n: number) => String(n).padStart(2, "0");

export const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const addDays = (d: Date, days: number) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + days);
  return copy;
};

export const formatShort = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return `${d}-${MONTHS_SHORT[m - 1]}`;
};

export const formatLong = (d: Date) => `${d.getDate()}-${MONTHS_LONG[d.getMonth()]}, ${WEEKDAYS[d.getDay()]}`;

export const greeting = (d: Date) => {
  const h = d.getHours();
  if (h < 5) return "Xayrli tun";
  if (h < 12) return "Xayrli tong";
  if (h < 18) return "Xayrli kun";
  return "Xayrli kech";
};
