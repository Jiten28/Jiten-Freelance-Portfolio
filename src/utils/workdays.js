export function toLocalIsoDate(d = new Date()) {
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}
export function parseLocalDate(v) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(v || ""))) return null;
  const [y, m, d] = v.split("-").map(Number),
    x = new Date(y, m - 1, d);
  return x.getFullYear() === y && x.getMonth() === m - 1 && x.getDate() === d
    ? x
    : null;
}
export function getProposedStartDate(now = new Date()) {
  return toLocalIsoDate(
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1),
  );
}
export function countWorkingDays(a, b) {
  const s = parseLocalDate(a),
    t = parseLocalDate(b);
  if (!s || !t || t <= s || t.getDay() === 0) return 0;
  let n = 0,
    c = new Date(s);
  while (c <= t) {
    if (c.getDay() !== 0) n++;
    c.setDate(c.getDate() + 1);
  }
  return n;
}
export function validateTargetDate(a, b) {
  const s = parseLocalDate(a),
    t = parseLocalDate(b);
  if (!t) return "Choose a valid target completion date.";
  if (!s) return "The proposed start date is invalid.";
  if (t <= s) return "Target completion must be after the proposed start date.";
  if (t.getDay() === 0)
    return "Sunday is not a working day. Please choose Monday–Saturday.";
  return "";
}
export function formatProjectDate(v) {
  const d = parseLocalDate(v);
  return d
    ? new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d)
    : "—";
}
