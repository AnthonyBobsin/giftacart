
export const humanTime = iso8601 => {
  const time = new Date(iso8601);
  return time.toLocaleString("en-US", { timeStyle: "short" });
}

export const humanDate = iso8601 => {
  const time = new Date(iso8601);
  return time.toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric" });
}
